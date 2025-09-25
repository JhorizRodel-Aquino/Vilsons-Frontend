import { useEffect } from "react";

type CheckboxProps = { 
    value: string; 
    label?: string;
    checked: boolean ;
    setChecked: (checked: boolean) => void;
}

export default function Checkbox({ value, label = '', checked, setChecked }: CheckboxProps) {
    useEffect(() => {console.log(checked)}, [checked])

    return (
        <>
            {label
                ?
                    <label htmlFor={value} className="flex gap-3 items-center">
                        <input id={value} name={value} type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                        {label}
                    </label>

                :   <input id={value} type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            }

        </>
    )
}