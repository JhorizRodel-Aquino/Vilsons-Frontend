import { useState } from "react";

export default function Switch({ disabled = false, checked, setChecked }: {disabled?: boolean, checked: boolean, setChecked: (checked: boolean) => void}) {
    // const [enabled, setEnabled] = useState(false);

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => setChecked(!checked)}
            className={`relative inline-flex h-5 w-8 items-center rounded-full transition-colors 
                ${checked ? "bg-primary" : "bg-dark/65"} ${disabled && 'opacity-50'}`}
        >
            <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-light transition-transform 
                        ${checked ? "translate-x-4" : "translate-x-1"}`}
            />
        </button>
    );
}