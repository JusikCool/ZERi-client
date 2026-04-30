import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    className?: string;
  }
>;

function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const baseClassName =
    "inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-[14px] px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40";
  const variantClassName =
    variant === "primary"
      ? "bg-blue-500 text-white shadow-[0_10px_20px_rgba(59,130,246,0.22)]"
      : "border border-slate-200 bg-white text-slate-800";

  return (
    <button
      type={type}
      className={`${baseClassName} ${variantClassName} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
