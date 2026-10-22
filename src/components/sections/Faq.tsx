"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const faqs = [
  {
    q: "A avaliação inicial tem custo?",
    a: "Na avaliação conversamos sobre o seu objetivo, examinamos seus dentes e apresentamos as opções de tratamento. Informamos as condições antes de qualquer procedimento.",
  },
  {
    q: "O tratamento dói?",
    a: "Trabalhamos com técnicas modernas e anestesia quando necessário para aumentar o seu conforto. Cada caso é avaliado individualmente e você é avisado antes de cada etapa.",
  },
  {
    q: "Posso parcelar o tratamento?",
    a: "Sim. Apresentamos as formas de pagamento disponíveis junto com o plano de tratamento, para você decidir com tranquilidade.",
  },
  {
    q: "Quanto tempo dura um tratamento?",
    a: "Depende do que for necessário em cada caso. Na avaliação definimos as etapas e uma estimativa de prazo.",
  },
  {
    q: "Vocês atendem crianças?",
    a: "Sim, com um atendimento adaptado para que a primeira experiência no dentista seja positiva.",
  },
];

export default function Faq() {
  const container = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".faq-head",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".faq-head", start: "top 85%", once: true },
          }
        );

        gsap.fromTo(
          ".faq-item",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".faq-list", start: "top 80%", once: true },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      id="faq"
      ref={container}
      className="mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="faq-head self-start">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Dúvidas
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Perguntas{" "}
            <em className="font-serif font-normal text-primary">frequentes</em>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq-item border-b border-primary/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-foreground"
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-foreground/70">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}