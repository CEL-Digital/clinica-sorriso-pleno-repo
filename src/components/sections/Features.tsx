"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const features = [
  {
    number: "01",
    title: "Tecnologia digital",
    text: "Escaneamento 3D e planejamento digital: menos desconforto e resultados mais previsíveis.",
  },
  {
    number: "02",
    title: "Atendimento sem dor",
    text: "Técnicas modernas de anestesia e um ritmo de consulta que respeita o seu tempo.",
  },
  {
    number: "03",
    title: "Plano sob medida",
    text: "Cada tratamento é desenhado para o seu objetivo, com etapas e valores explicados antes de começar.",
  },
];

export default function Features() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".feature-head",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".feature-head",
              start: "top 85%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".feature-card",
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".feature-grid",
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      id="diferenciais"
      ref={container}
      className="mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <div className="feature-head max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Nossos diferenciais
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Cuidado que você{" "}
          <em className="font-serif font-normal text-primary">vê</em> desde
          a chegada
        </h2>
      </div>

      <div className="feature-grid mt-12 grid gap-6 md:grid-cols-3">
        {features.map((item) => (
          <article
            key={item.number}
            className="feature-card rounded-3xl border border-primary/10 bg-white p-8 transition-shadow hover:shadow-lg"
          >
            <span className="font-serif text-3xl italic text-accent">
              {item.number}
            </span>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 text-foreground/70">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}