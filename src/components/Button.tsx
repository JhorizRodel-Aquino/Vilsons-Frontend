type ButtonProps = { 
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // ✅ better typing
  variant?: 'primary' | 'gray' | 'outline';
};

function Button({ label, onClick, variant='primary' }: ButtonProps) {
  const variants: Record<typeof variant, string> = {
    primary: "bg-primary text-light hover:bg-primary/80",
    gray: "bg-border text-darker hover:bg-border/70",
    outline: "bg-none text-darker border-all border-[2px] hover:bg-border/30",
  };

  return (
    <button 
        className={`btn ${variants[variant]}`} 
        onClick={onClick}
    >
            {label}
    </button>
  );
}

export default Button;