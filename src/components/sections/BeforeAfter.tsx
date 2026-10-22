"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";

export default function BeforeAfter() {
  const container = useRef<HTMLElement>(null);
  const compare = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const sweep = useRef<gsap.core.Timeline | null>(null);

  // Atualiza a posição da linha e mantém o input sincronizado
  const setPos = (value: number) => {
    compare.current?.style.setProperty("--pos", `${value}%`);
    if (range.current) range.current.value = String(value);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: ".ba-compare", start: "top 75%", once: true };

        // Entrada da seção
        gsap.fromTo(
          ".ba-head",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { ...trigger, trigger: ".ba-head", start: "top 85%" },
          }
        );

        gsap.fromTo(
          ".ba-compare",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: trigger,
          }
        );

        // Varredura de demonstração (a linha vai e volta uma vez)
        const pos = { v: 50 };
        const update = () => setPos(pos.v);

        sweep.current = gsap
          .timeline({ delay: 0.9, scrollTrigger: trigger })
          .to(pos, { v: 12, duration: 0.9, ease: "power2.inOut", onUpdate: update })
          .to(pos, { v: 88, duration: 1.4, ease: "power2.inOut", onUpdate: update })
          .to(pos, { v: 50, duration: 0.9, ease: "power2.out", onUpdate: update });
      });
    },
    { scope: container }
  );

  return (
    <section
      id="resultados"
      ref={container}
      className="mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <div className="ba-head max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Resultados
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Mudanças que você{" "}
          <em className="font-serif font-normal text-primary">vê</em> no
          espelho
        </h2>
      </div>

      <div
        ref={compare}
        className="ba-compare relative mt-12 aspect-[4/3] overflow-hidden rounded-3xl focus-within:ring-2 focus-within:ring-primary md:aspect-[16/9]"
      >
        {/* ANTES (camada de baixo) */}
        <div className="absolute inset-0">
          <Image
            src="/images/before.png"
            alt="Sorriso antes do tratamento (imagem ilustrativa gerada por IA)"
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-foreground">
            Antes
          </span>
        </div>

        {/* DEPOIS (camada de cima, cortada pela posição da linha) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 0 var(--pos))" }}
        >
          <Image
            src="/images/after.png"
            alt="Sorriso depois do tratamento (imagem ilustrativa gerada por IA)"
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover"
          />
          <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-foreground">
            Depois
          </span>
        </div>

        {/* Linha e botão do slider */}
        <div className="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-0.5 -translate-x-1/2 bg-white">
          <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-lg">
            ↔
          </div>
        </div>

        {/* Controle real: invisível, cobre toda a área */}
        <input
          ref={range}
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          aria-label="Comparar antes e depois"
          onInput={(e) => setPos(Number(e.currentTarget.value))}
          onPointerDown={() => sweep.current?.kill()}
          onKeyDown={() => sweep.current?.kill()}
          className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>

      <p className="mt-4 text-sm text-foreground/50">
        Imagens ilustrativas.
      </p>
    </section>
  );
}