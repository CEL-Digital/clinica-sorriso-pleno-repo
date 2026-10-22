type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
};

const variants = {
  primary: "bg-primary text-background hover:bg-foreground",
  ghost: "border border-primary/30 text-primary hover:bg-primary/5",
  light: "bg-white text-primary hover:bg-accent",
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}