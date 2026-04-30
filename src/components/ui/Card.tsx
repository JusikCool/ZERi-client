import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-[24px] border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export default Card;
