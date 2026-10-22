"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Título: libera a visibilidade e anima palavra por palavra
        gsap.set(".hero-title", { autoAlpha: 1 });

        SplitText.create(".hero-title", {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.08,
              delay: 0.15,
              ease: "power4.out",
            });
          },
        });

        // 2. Demais elementos em uma timeline, com tempos absolutos
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-eyebrow",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0
        )
          .fromTo(
            ".hero-text",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            0.6
          )
          .fromTo(
            ".hero-cta",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            0.75
          )
          .fromTo(
            ".hero-image",
            { autoAlpha: 0, scale: 0.94 },
            { autoAlpha: 1, scale: 1, duration: 1.1 },
            0.2
          );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-20"
    >
      <div>
        <p className="hero-eyebrow mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Odontologia moderna e acolhedora
        </p>

        <h1 className="hero-title text-4xl font-semibold leading-tight text-foreground md:text-6xl">
          Seu melhor sorriso,{" "}
          <em className="font-serif font-normal text-primary">sem medo</em>
        </h1>

        <p className="hero-text mt-6 max-w-md text-lg text-foreground/70">
          Tratamentos com tecnologia de ponta e um atendimento pensado para
          você se sentir à vontade desde a primeira consulta.
        </p>

        <div className="hero-cta mt-8 flex flex-wrap gap-4">
          <Button href="#agendar">Agendar avaliação</Button>
          <Button href="#tratamentos" variant="ghost">
            Conhecer tratamentos
          </Button>
        </div>
      </div>

      <div className="hero-image relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/images/hero-image.png"
            alt="Paciente sorrindo em um consultório odontológico"
            fill
            preload
            sizes="(min-width: 768px) 540px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white px-5 py-4 shadow-lg">
          <p className="text-2xl font-semibold text-primary">+5.000</p>
          <p className="text-sm text-foreground/70">sorrisos transformados</p>
        </div>
      </div>
    </section>
  );
}