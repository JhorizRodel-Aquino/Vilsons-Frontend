import type { ReactNode } from "react"
import InputBox from "./InputBox"

export default function Field() {
    return (
        <></>
    )
}

Field.Text = function Text({ id, label, width = 'hug', placeholder = '', value, onChange, autoComplete }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; autoComplete?: string}) {
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

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <InputBox className="flex justify-between">
                <input id={id} name={label} type="text" placeholder={placeholder} className="input" value={value} onChange={onChange}  autoComplete={autoComplete} />
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

Field.Money = function Money({ id, label, width = 'hug' }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string }) {
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
                    <input id={id} name={label} type="number" placeholder={'0.00'} min={0} className="input px-0" />
                </div>
            </InputBox>
        </div>


    )
}