import type { ReactNode } from "react";

interface KeyValueProps {
  label: ReactNode;     // The key (dt)
  value: ReactNode;     // The value (dd)
  align?: "left" | "center" | "right";
  className?: string;
}

export default function KeyValue({ label, value, align = "left", className = '' }: KeyValueProps) {
  const alignment = {
    left: "justify-items-start",
    center: "justify-items-center",
    right: "justify-items-end",
  }[align];

  return (
    <dl className={`grid gap-1 ${alignment} ${className}`}>
      <dt className="text-base text-darker">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </dl>
  );
}
