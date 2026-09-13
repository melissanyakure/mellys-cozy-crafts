import type { ButtonHTMLAttributes, ReactNode } from "react";

type SiteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "outline";
};

export function SiteButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: SiteButtonProps) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary-hover",
    outline:
      "border border-border bg-background text-foreground hover:bg-secondary",
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}