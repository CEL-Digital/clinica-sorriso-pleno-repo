type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-primary text-background hover:bg-foreground"
      : "border border-primary/30 text-primary hover:bg-primary/5";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}