"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import Button from "@/components/ui/Button";

export default function Cta() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".cta-title", { autoAlpha: 1 });

        SplitText.create(".cta-title", {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.07,
              ease: "power4.out",
              scrollTrigger: {
                trigger: ".cta-title",
                start: "top 85%",
                once: true,
              },
            });
          },
        });

        gsap.fromTo(
          ".cta-item",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: { trigger: ".cta-title", start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section id="agendar" ref={container} className="px-6 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-primary px-8 py-16 text-center text-background md:px-16 md:py-24">
        <p className="cta-item mb-4 text-sm font-medium uppercase tracking-widest text-background/80">
          Agende sua avaliação
        </p>

        <h2 className="cta-title mx-auto max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Pronto para sorrir{" "}
          <em className="font-serif font-normal text-accent">sem medo</em>?
        </h2>

        <p className="cta-item mx-auto mt-6 max-w-md text-lg text-background/80">
          Dê o primeiro passo com uma conversa tranquila e sem compromisso.
        </p>

        <div className="cta-item mt-10">
          <Button href="mailto:contato@sorrisopleno.example" variant="light">
            Agendar minha avaliação
          </Button>
        </div>
      </div>
    </section>
  );
}