import { useState } from "react";

export default function Switch({ disabled = false }: {disabled?: boolean}) {
    const [enabled, setEnabled] = useState(false);

    return (
        <button
            disabled={disabled}
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-5 w-8   items-center rounded-full transition-colors 
                ${enabled ? "bg-primary" : "bg-dark/65"} ${disabled && 'opacity-50'}`}
        >
            <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-light transition-transform 
                        ${enabled ? "translate-x-4" : "translate-x-1"}`}
            />
        </button>
    );
}