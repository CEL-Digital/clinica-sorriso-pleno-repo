"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    title: "Avaliação inicial",
    text: "Conversamos sobre o que você deseja, fazemos o exame clínico e tiramos todas as dúvidas, sem compromisso.",
  },
  {
    title: "Plano de tratamento",
    text: "Você recebe um plano claro, com etapas, prazos e valores explicados antes de qualquer procedimento.",
  },
  {
    title: "Tratamento",
    text: "Realizamos cada etapa com tecnologia moderna e foco no seu conforto, no ritmo combinado.",
  },
  {
    title: "Acompanhamento",
    text: "Depois do resultado, mantemos revisões periódicas para o seu sorriso durar muito tempo.",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Título
        gsap.fromTo(
          ".how-head",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".how-head",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Linha que cresce junto com a rolagem
        gsap.fromTo(
          ".how-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".how-steps",
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );

        // Cada etapa: entra em fade e acende o número
        gsap.utils.toArray<HTMLElement>(".how-step").forEach((step) => {
          gsap.fromTo(
            step,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 75%", once: true },
            }
          );

          ScrollTrigger.create({
            trigger: step,
            start: "top 70%",
            end: "max",
            toggleClass: {
              targets: step.querySelector(".how-dot"),
              className: "is-active",
            },
          });
        });
      });
    },
    { scope: container }
  );

  return (
    <section id="como-funciona" ref={container} className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        <div className="how-head self-start md:sticky md:top-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Como funciona
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Um caminho{" "}
            <em className="font-serif font-normal text-primary">simples</em>,
            do primeiro contato ao sorriso novo
          </h2>
          <p className="mt-6 max-w-md text-lg text-foreground/70">
            Você sabe o que vai acontecer em cada etapa, sem surpresas.
          </p>
        </div>

        <ol className="how-steps relative space-y-16 pl-12">
          {/* Trilho fixo e linha animada */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[15.5px] top-2 w-px bg-primary/15"
          />
          <span
            aria-hidden
            className="how-line absolute bottom-2 left-[15.5px] top-2 w-px origin-top bg-primary"
          />

          {steps.map((step, i) => (
            <li key={step.title} className="how-step relative">
              <span className="how-dot absolute -left-12 top-0 grid h-8 w-8 place-items-center rounded-full border border-primary/30 bg-white font-serif text-sm italic text-primary transition-colors duration-300">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-md text-foreground/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}