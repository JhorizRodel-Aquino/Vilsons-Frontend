import type { ReactNode } from "react";

interface KeyValueProps {
  label: ReactNode;     // The key (dt)
  value: ReactNode;     // The value (dd)
  align?: "left" | "center" | "right" | "between";
  className?: string;
  variant?: 'standard' | 'flipped' | 'adjacent';
  highlight?: boolean;
}

export default function KeyValue({ label, value, align = "left", className = '', variant = 'standard', highlight = false }: KeyValueProps) {
  const alignment = {
    left: "justify-items-start",
    center: "justify-items-center",
    right: "justify-items-end",
    between: "justify-between",
  }[align];

  return (
    <>
      {variant === 'standard' 
        ?     
          <dl className={`grid gap-1 ${alignment} ${className} ${highlight && 'text-primary'}`}>
            <dt className={`text-base ${!highlight && 'text-darker'}`}>{label}</dt>
            <dd className="font-medium">{value}</dd>
          </dl>
        : variant === 'adjacent' ?
          <dl className={`grid grid-flow-col gap-1 ${alignment} ${className} ${highlight && 'text-primary'}`}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </dl>
        :
          <dl className={`grid ${alignment} ${className} ${highlight && 'text-primary'}`}>
            <dd className="text-md font-bold">{value}</dd>
            <dt className={`text-base ${!highlight && 'text-darker'}`}>{label}</dt>
          </dl>
      }
    </>
  );
}
