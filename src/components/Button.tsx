type ButtonProps = { 
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // ✅ better typing
  variant?: 'primary' | 'gray' | 'outline';
  size?: 'standard' | 'mini';
};

function Button({ label, onClick, variant = 'primary', size = 'standard' }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-light hover:bg-primary/80",
    gray: "bg-border text-darker hover:bg-border/70",
    outline: "bg-none text-darker border-all border-[2px] hover:bg-border/30",
  }[variant];

  const sizes = {
    standard: "py-2 px-3 font-semibold",
    mini: "py-[2px] px-[6px] font-medium",
  }[size];

  return (
    <button 
        className={`btn ${variants} ${sizes}`} 
        onClick={onClick}
    >
            {label}
    </button>
  );
}

export default Button;