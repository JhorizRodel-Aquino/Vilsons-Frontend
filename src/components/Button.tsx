type ButtonProps = {
  type?: "submit" | "reset" | "button";
  label: string;
  onClick?: () => void; // ✅ better typing
  variant?: 'primary' | 'gray' | 'outline' | 'red';
  size?: 'standard' | 'mini';
  disabled?: boolean;
};

export default function Button({ type = "button", label, onClick, variant = 'primary', size = 'standard', disabled }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-light hover:bg-primary/80",
    gray: "bg-border text-darker hover:bg-border/70",
    outline: "bg-none text-darker border-all border-[2px] hover:bg-border/30",
    red: "bg-red text-light hover:bg-red/80",
  }[variant];

  const sizes = {
    standard: "py-2 px-3 font-semibold",
    mini: "py-[2px] px-[6px] font-medium",
  }[size];

  return (
    <button
      type={type}
      className={`btn ${variants} ${sizes} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

type ButtonXProps = {
  onClick?: () => void;
  disabled?: boolean
}

Button.X = function X({ onClick, disabled }: ButtonXProps) {
  return (
    <button type="button" className={`cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} onClick={onClick} disabled={disabled}>✕</button>
  )
};