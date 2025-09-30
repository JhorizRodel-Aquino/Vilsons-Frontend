import type { ReactNode } from "react"
import InputBox from "./InputBox"

export default function Field() {
    return (
        <></>
    )
}

Field.Text = function Text({ id, label, width = 'hug', placeholder='' }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string }) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]
    
    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <input id={id} name={label} type="text" placeholder={placeholder} className="input"/>
            </InputBox>
        </div>
    )
}
Field.TextArea = function Text({ id, label, width = 'hug', placeholder='', child }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string, child?: ReactNode }) {
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

Field.Number = function Number({ id, label, width = 'hug', placeholder='' }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string }) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]
    
    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <input id={id} name={label} type="number" placeholder={placeholder} min={0} className="input"/>
            </InputBox> 
        </div>
    )
}