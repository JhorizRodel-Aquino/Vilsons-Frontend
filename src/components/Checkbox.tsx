export default function Checkbox({ value, label = '' }: { value: string, label?: string }) {
    return (
        <>
            {label
                ?
                    <label htmlFor={value} className="flex gap-3 items-center">
                        <input id={value} name={value} type="checkbox" />
                        {label}
                    </label>

                :   <input id={value} type="checkbox" />
            }

        </>
    )
}