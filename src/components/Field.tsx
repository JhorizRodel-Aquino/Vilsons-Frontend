import { useState, type ReactNode } from "react"
import InputBox from "./InputBox"
import { NumericFormat, type NumberFormatValues } from "react-number-format";

export default function Field() {
    return (
        <>

        </>
    )
}

type FieldText = {
    id?: string,
    label?: string,
    width?: 'hug' | 'full',
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void, autoComplete?: string
}

Field.Text = function Text({ id, label, width = 'hug', placeholder = '', value, onChange, onKeyDown, autoComplete }: FieldText) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    const handleClear = () => {
        if (onChange) {
            // simulate clearing input by sending an empty string
            const fakeEvent = {
                target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onKeyDown) onKeyDown(e);
    };

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <InputBox className="flex justify-between">
                <input
                    id={id}
                    name={label}
                    type="text"
                    placeholder={placeholder}
                    className="input" value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    autoComplete={autoComplete}
                />
                {value && <button className="cursor-pointer text-sm mx-2" onClick={handleClear}>✕</button>}
            </InputBox>
        </div>
    )
}

Field.TextArea = function Text({ id, label, width = 'hug', placeholder = '', child }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string, child?: ReactNode }) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <textarea id={id} name={label} placeholder={placeholder} className="input w-full resize-none thin-scrollbar" rows={5} >
                    {child}
                </textarea>
            </InputBox>
        </div>
    )
}

Field.Email = function Email({ id, label, width = 'hug', placeholder = '' }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string }) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <input id={id} name={label} type="email" placeholder={placeholder} className="input" />
            </InputBox>
        </div>
    )
}

Field.Number = function Number({ id, label, width = 'hug', placeholder = '' }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string }) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <input id={id} name={label} type="number" placeholder={placeholder} min={0} className="input" />
            </InputBox>
        </div>
    )
}

type FieldNumber = {
    id?: string,
    label?: string,
    width?: 'hug' | 'full',
    placeholder?: string,
    value?: number | null,
    onChange?: (values: NumberFormatValues) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

// Field.Money = function Money({ id, label, width = 'hug', placeholder = '', value, onChange }: FieldNumber) {
//     const fieldWidth = {
//         hug: 'w-auto',
//         full: 'w-full'
//     }[width]

//     return (
//         <div className={`${fieldWidth}`}>
//             {label && <label htmlFor={label}>{label}</label>}
//             <InputBox>
//                 <div className="grid grid-cols-[auto_1fr] items-center gap-1 input w-auto">
//                     <label htmlFor="search">₱</label>
//                     <input
//                         id={id}
//                         name={label}
//                         type="number"
//                         placeholder={placeholder || '0.00'}
//                         min={0}
//                         className="input px-0"
//                         value={value}
//                         onChange={onChange}
//                     />
//                 </div>
//             </InputBox>
//         </div>


//     )
// }

Field.Money = function Money({ id, label, width = 'hug', placeholder = '', value, onChange }: FieldNumber) {
    // const [amount, setAmount] = useState<number | null>(null);

    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <div className="grid grid-cols-[auto_1fr] items-center gap-1 input w-auto">
                    <label htmlFor="search">₱</label>
                    <NumericFormat
                        id={id}
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder={placeholder || "0.00"}
                        className="input px-0 text-right "
                        value={value}
                        onValueChange={onChange}
                    />
                </div>
            </InputBox >
        </div >

    )
}
