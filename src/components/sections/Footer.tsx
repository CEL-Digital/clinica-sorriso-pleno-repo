import CurrentYear from "../ui/CurrentYear";

const links = [
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Dúvidas", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-primary/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-foreground/60 md:flex-row md:items-center md:justify-between">
        <p>
          © <CurrentYear /> Clínica Sorriso Pleno. Projeto fictício
          de demonstração.
        </p>
        <nav className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}