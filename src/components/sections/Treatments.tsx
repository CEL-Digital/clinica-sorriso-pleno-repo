"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const treatments = [
  {
    title: "Clareamento",
    text: "Dentes mais claros com técnica segura, acompanhamento profissional e sensibilidade controlada.",
    tags: ["Consultório", "Caseiro supervisionado", "Resultado em dias"],
  },
  {
    title: "Ortodontia",
    text: "Aparelhos fixos e alinhadores transparentes, com planejamento digital do começo ao fim.",
    tags: ["Alinhadores", "Aparelho estético", "Todas as idades"],
  },
  {
    title: "Implantes",
    text: "Reposição de dentes com naturalidade, função completa e atenção a cada etapa da cirurgia.",
    tags: ["Planejamento 3D", "Pós-operatório", "Alta durabilidade"],
  },
  {
    title: "Prevenção e limpeza",
    text: "Rotina de cuidados para manter a saúde bucal em dia e evitar tratamentos mais complexos.",
    tags: ["Profilaxia", "Avaliação periódica", "Orientação personalizada"],
  },
];

export default function Treatments() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(".treat-panel");
          const tabs = gsap.utils.toArray<HTMLElement>(".treat-tab");

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
            trigger: ".treat-pin",
            start: "top top",
            end: `+=${panels.length * 50}%`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            },
          });

          panels.forEach((_, i) => {
            if (i === 0) return;

            tl.to(panels[i - 1], { autoAlpha: 0, y: -30, duration: 0.4 }, i)
              .to(tabs[i - 1], { opacity: 0.35, duration: 0.4 }, i)
              .fromTo(
                panels[i],
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.4 },
                i + 0.2
              )
              .to(tabs[i], { opacity: 1, duration: 0.4 }, i);
          });

          // Pausa no final, para o último painel não sumir de imediato
          tl.to({}, { duration: 0.5 });
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="tratamentos" ref={container} className="bg-white">
      <div className="treat-pin mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Tratamentos
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Do check-up ao{" "}
            <em className="font-serif font-normal text-primary">novo sorriso</em>
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <ol className="hidden space-y-4 md:block">
            {treatments.map((t, i) => (
              <li
                key={t.title}
                className="treat-tab flex items-baseline gap-4 text-2xl font-semibold text-foreground"
              >
                <span className="font-serif text-base italic text-primary">
                  0{i + 1}
                </span>
                {t.title}
              </li>
            ))}
          </ol>

          <div className="treat-stage flex flex-col gap-6">
            {treatments.map((t, i) => (
              <article
                key={t.title}
                className="treat-panel rounded-3xl bg-background p-8 md:p-10"
              >
                <span className="font-serif text-lg italic text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
                  {t.title}
                </h3>
                <p className="mt-4 max-w-md text-foreground/70">{t.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-primary/20 px-4 py-1.5 text-sm text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}