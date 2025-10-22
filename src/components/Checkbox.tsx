type CheckboxProps = { 
    value: string; 
    label?: string;
    checked: boolean ;
    setChecked: (checked: boolean) => void;
    disabled?: boolean;
}

export default function Checkbox({ value, label = '', checked, setChecked, disabled = false }: CheckboxProps) {

    return (
        <>
            {label
                ?
                    <label htmlFor={value} className="flex gap-3 items-center">
                        <input id={value} name={value} type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className={disabled ? 'opacity-60' : 'opacity-100'} />
                        {label}
                    </label>

                :   <input id={value} type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className={`${disabled ? 'opacity-60' : 'opacity-100'}`} />
            }

        </>
    )
}