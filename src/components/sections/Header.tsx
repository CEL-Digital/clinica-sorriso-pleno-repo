import Button from "@/components/ui/Button";

const links = [
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Dúvidas", href: "#faq" },
];

export default function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 gap-25">
      <a href="#" className="text-lg font-semibold text-foreground">
        Sorriso <span className="font-serif italic text-primary">Pleno</span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-foreground/70 transition-colors hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Button href="#agendar">Agendar avaliação</Button>
    </header>
  );
}