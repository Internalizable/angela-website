import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "accent" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold tracking-[0.005em] " +
  "shadow-soft transition-[transform,box-shadow,background-color] duration-300 ease-spring " +
  "will-change-transform hover:-translate-y-0.5 hover:shadow-float active:translate-y-0 " +
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sage-ink";

const variants: Record<Variant, string> = {
  solid: "bg-forest text-on-dark hover:bg-forest-deep",
  accent: "bg-honey text-honey-ink hover:brightness-105",
  ghost: "bg-transparent text-forest ring-2 ring-forest/20 hover:ring-sage",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[0.98rem]",
  lg: "px-7 py-4 text-[1.05rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps & { as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>;
type AsLink = CommonProps & { as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button(props: AsButton | AsLink) {
  const { variant = "solid", size = "md", className = "", children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === "a") {
    const { as: _as, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { as?: string };
    void _as;
    return (
      <a className={cls} {...anchor}>
        {children}
      </a>
    );
  }
  const { as: _as, ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { as?: string };
  void _as;
  return (
    <button className={cls} {...button}>
      {children}
    </button>
  );
}
