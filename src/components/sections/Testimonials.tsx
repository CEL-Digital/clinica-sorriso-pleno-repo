"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const testimonials = [
  {
    quote: "Eu tinha pavor de dentista. Na primeira consulta me explicaram tudo e saí sem medo nenhum.",
    name: "Mariana S.",
    role: "Paciente de ortodontia",
  },
  {
    quote: "O plano de tratamento veio com etapas e valores claros. Isso fez toda a diferença para decidir.",
    name: "Carlos R.",
    role: "Paciente de implantes",
  },
  {
    quote: "Atendimento pontual, ambiente acolhedor e um resultado que superou o que eu esperava.",
    name: "Patrícia L.",
    role: "Paciente de clareamento",
  },
  {
    quote: "Levei meu filho e ele pediu para voltar. Nunca imaginei ouvir isso de uma criança.",
    name: "Rafael M.",
    role: "Pai de paciente",
  },
  {
    quote: "As revisões periódicas me ajudaram a manter tudo em dia sem complicação.",
    name: "Juliana T.",
    role: "Paciente de prevenção",
  },
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 gap-6 pr-6 ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {testimonials.map((t) => (
        <li
          key={t.name}
          className="flex w-[300px] shrink-0 flex-col justify-between rounded-3xl border border-primary/10 bg-white p-8 md:w-[380px]"
        >
          <p className="text-foreground/80">“{t.quote}”</p>
          <div className="mt-6">
            <p className="font-semibold text-foreground">{t.name}</p>
            <p className="text-sm text-foreground/60">{t.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Testimonials() {
  const container = useRef<HTMLElement>(null);
  const marquee = useRef<gsap.core.Tween | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".testi-head",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testi-head",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Faixa contínua: anda metade da largura (uma cópia) e recomeça
        marquee.current = gsap.to(".t-track", {
          xPercent: -50,
          duration: 45,
          ease: "none",
          repeat: -1,
        });
      });
    },
    { scope: container }
  );

  // Desacelera ao passar o mouse e retoma ao sair
  const setSpeed = contextSafe((speed: number) => {
    if (marquee.current) {
      gsap.to(marquee.current, { timeScale: speed, duration: 0.6, overwrite: true });
    }
  });

  return (
    <section
      id="depoimentos"
      ref={container}
      className="py-20 md:py-28"
    >
      <div className="testi-head mx-auto max-w-6xl px-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Depoimentos
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Pacientes que voltaram a{" "}
          <em className="font-serif font-normal text-primary">sorrir</em>
        </h2>
      </div>

      <div
        className="mt-12 overflow-x-auto motion-safe:overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onMouseEnter={() => setSpeed(0)}
        onMouseLeave={() => setSpeed(1)}
      >
        <div className="t-track flex w-max">
          <Group />
          <Group hidden />
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-6xl px-6 text-sm text-foreground/50">
        Depoimentos ilustrativos.
      </p>
    </section>
  );
}