import React, { useEffect, useRef, type ChangeEventHandler, type ReactNode } from "react"
import InputBox from "./InputBox"
import { NumericFormat, type NumberFormatValues } from "react-number-format";
import { useFloating, offset, flip, shift, useClick, useDismiss, useRole, FloatingFocusManager, useInteractions } from "@floating-ui/react";
import { useState } from "react";



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
    list?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    autoComplete?: string
    readonly?: boolean;
}

Field.Text = function Text({ id, label, width = 'hug', placeholder = '', value, onChange, onKeyDown, autoComplete, list, readonly = false }: FieldText) {
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
                    className="input"
                    value={value}
                    list={list}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    autoComplete={autoComplete}
                    readOnly={readonly}
                />
                {value && !readonly && <button className="cursor-pointer text-sm mx-2" onClick={handleClear}>✕</button>}
            </InputBox>
        </div>
    )
}

Field.Password = function Password({ id, label, width = 'hug', placeholder = '', value, onChange, onKeyDown, autoComplete, list, readonly = false }: FieldText) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    const handleClear = () => {
        if (onChange) {
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
                    type="password"
                    placeholder={placeholder}
                    className="input"
                    value={value}
                    list={list}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    autoComplete={autoComplete}
                    readOnly={readonly}
                />
                {value && !readonly && <button className="cursor-pointer text-sm mx-2" onClick={handleClear}>✕</button>}
            </InputBox>
        </div>
    )
}

Field.TextArea = function Text({ id, label, width = 'hug', placeholder = '', child, value, onChange }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string, child?: ReactNode, value?: string, onChange?: ChangeEventHandler<HTMLTextAreaElement> }) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <textarea id={id} value={value} onChange={onChange} name={label} placeholder={placeholder} className="input w-full resize-none thin-scrollbar" rows={5} >
                    {child}
                </textarea>
            </InputBox>
        </div>
    )
}

Field.Email = function Text({ id, label, width = 'hug', placeholder = '', value, onChange, onKeyDown, autoComplete, list, readonly = false }: FieldText) {
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
                    type="email"
                    placeholder={placeholder}
                    className="input"
                    value={value}
                    list={list}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    autoComplete={autoComplete}
                    readOnly={readonly}
                />
                {value && !readonly && <button className="cursor-pointer text-sm mx-2" onClick={handleClear}>✕</button>}
            </InputBox>
        </div>
    )
}

// Field.Email = function Email({ id, label, width = 'hug', placeholder = '' }: { id?: string, label?: string, width?: 'hug' | 'full', placeholder?: string }) {
//     const fieldWidth = {
//         hug: 'w-auto',
//         full: 'w-full'
//     }[width]

//     return (
//         <div className={`${fieldWidth}`}>
//             {label && <label htmlFor={label}>{label}</label>}
//             <InputBox>
//                 <input id={id} name={label} type="email" placeholder={placeholder} className="input" />
//             </InputBox>
//         </div>
//     )
// }

type FieldNumber = {
    id?: string,
    label?: string,
    width?: 'hug' | 'full',
    placeholder?: string,
    value?: number | string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void, autoComplete?: string
    noSpinner?: boolean;
    min?: number;
    max?: number;
}

Field.Number = function Number({ id, label, width = 'hug', placeholder = '', value, onChange, noSpinner = false, min, max }: FieldNumber) {
    const fieldWidth = {
        hug: 'w-auto',
        full: 'w-full'
    }[width]

    return (
        <div className={`${fieldWidth}`}>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox>
                <input
                    id={id}
                    name={label}
                    type="number"
                    placeholder={placeholder}
                    min={min ?? 0}
                    max={max ?? 1000000000000}
                    className={`input ${noSpinner && 'hide-spinner'}`}
                    value={value || ""}
                    onChange={onChange || console.log} />
            </InputBox>
        </div>
    )
}

type FieldMoney = {
    id?: string,
    label?: string,
    width?: 'hug' | 'full',
    placeholder?: string,
    value?: number | null,
    onChange?: (values: NumberFormatValues) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

Field.Money = function Money({ id, label, width = 'hug', placeholder = '', value, onChange }: FieldMoney) {
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


type FieldList = {
    id?: string;
    label?: string;
    width?: "hug" | "full";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    children?: ReactNode;
    className?: string
    validated?: boolean;
    noValidation?: boolean;
    supportingInfo?: ReactNode;
    readOnly?: boolean;
};

// Field.List = function List({
//   id,
//   label,
//   width = "hug",
//   placeholder = "",
//   value,
//   onChange,
//   autoComplete,
//   children,
// }: FieldList) {
//   const [open, setOpen] = useState(false);

//   // floating-ui setup
//   const { refs, floatingStyles, context } = useFloating({
//     open,
//     onOpenChange: setOpen,
//     middleware: [offset(6), flip(), shift()],
//     placement: "bottom-start",
//   });

//   const dismiss = useDismiss(context);
//   const role = useRole(context);
//   const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

//   const fieldWidth = {
//     hug: "w-auto",
//     full: "w-full",
//   }[width];

//   const handleClear = () => {
//     if (onChange) {
//       const fakeEvent = {
//         target: { value: "" },
//       } as React.ChangeEvent<HTMLInputElement>;
//       onChange(fakeEvent);
//     }
//   };

//   // 🔹 Always open on focus
//   const handleFocus = () => setOpen(true);

//   // 🔹 When an option is clicked → set value, close, blur
// const handleSelect = (child: React.ReactNode) => {
//   let extractedValue = "";

//   if (React.isValidElement(child)) {
//     const element = child as React.ReactElement<any>;

//     // find the first <span> inside
//     const span = React.Children.toArray(element.props.children).find(
//       (nested): nested is React.ReactElement<any> =>
//         React.isValidElement(nested) && nested.type === "span"
//     );

//     if (span && typeof span.props.children === "string") {
//       extractedValue = span.props.children;
//     } else if (typeof element.props.children === "string") {
//       extractedValue = element.props.children;
//     }
//   }

//   if (onChange) {
//     const fakeEvent = {
//       target: { value: extractedValue },
//     } as React.ChangeEvent<HTMLInputElement>;
//     onChange(fakeEvent);
//   }

//   setOpen(false);

//   const inputEl = refs.domReference?.current as HTMLInputElement | null;
//   inputEl?.blur();
// };

//   return (
//     <div className={`${fieldWidth} relative`}>
//       {label && <label htmlFor={id}>{label}</label>}

//       <InputBox className="flex justify-between">
//         <input
//           ref={refs.setReference}
//           {...getReferenceProps()}
//           id={id}
//           type="text"
//           placeholder={placeholder}
//           className="input"
//           value={value}
//           onChange={onChange}
//           onFocus={handleFocus}
//           autoComplete={autoComplete}
//         />
//         {value && (
//           <button
//             type="button"
//             className="cursor-pointer text-sm mx-2 text-gray-500 hover:text-gray-700"
//             onClick={handleClear}
//           >
//             ✕
//           </button>
//         )}
//       </InputBox>

//       {/* 🔹 Floating List (always visible when focused) */}
//       {open && (
//         <FloatingFocusManager context={context} modal={false}>
//           <ul
//             ref={refs.setFloating}
//             style={floatingStyles}
//             {...getFloatingProps()}
//             className="bg-white rounded-md shadow-md z-30 w-full max-h-[180px] overflow-y-auto thin-scrollbar"
//           >
//             {React.Children.map(children, (child, i) => (
//               <li
//                 key={i}
//                 className="cursor-pointer hover:bg-gray p-2"
//                 onMouseDown={(e) => {
//                   e.preventDefault(); // prevent input losing focus before handling
//                   handleSelect(child);
//                 }}
//               >
//                 {child}
//               </li>
//             ))}
//           </ul>
//         </FloatingFocusManager>
//       )}
//     </div>
//   );
// };

Field.List = function List({
    id,
    label,
    width = "hug",
    placeholder = "",
    value,
    onChange,
    onKeyDown,
    onBlur,
    children,
    className,
    validated = false,
    noValidation = false,
    supportingInfo,
    readOnly = false
}: FieldList) {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const fieldWidth = {
        hug: "w-auto",
        full: "w-full",
    }[width];

    const handleClear = () => {
        if (onChange) {
            const fakeEvent = {
                target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    const handleSelect = (child: React.ReactNode) => {
        let extractedValue = "";

        if (React.isValidElement(child)) {
            const element = child as React.ReactElement<any>;
            const span = React.Children.toArray(element.props.children).find(
                (nested): nested is React.ReactElement<any> =>
                    React.isValidElement(nested) && nested.type === "span"
            );

            if (span && typeof span.props.children === "string") {
                extractedValue = span.props.children;
            } else if (typeof element.props.children === "string") {
                extractedValue = element.props.children;
            }
        }

        if (onChange) {
            const fakeEvent = {
                target: { value: extractedValue },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }

        // Lose focus → closes dropdown
        inputRef.current?.blur();
        setOpen(false);
    };

    return (
        <div>
            <div className={`${fieldWidth} relative ${className} overflow-visible`}>
                {label && <label htmlFor={id}>{label}</label>}

                <InputBox className={`flex justify-between ${!noValidation && (validated ? 'font-medium text-darkest border-b-2 border-green over'
                    : 'border-b border-yellow')}`}>
                    <div className="flex items-center w-full">
                        {/* <span className={`rounded-full w-2 h-2 ml-[8px] ${validated ? 'bg-green' : 'bg-yellow'}`}></span> */}
                        <input
                            ref={inputRef}
                            id={id}
                            type="text"
                            readOnly={readOnly}
                            placeholder={placeholder}
                            value={value}
                            className={`input ${!noValidation && (validated ? 'text-darker'
                                : 'text-gray-400')}`}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            onFocus={() => setOpen(true)} // open on focus
                            onBlur={(e) => {
                                onBlur && onBlur(e);
                                setOpen(false) // close when blurred
                            }} // close when blurred
                            name={"no-autofill-" + Math.random().toString(36).substring(2, 15)} // 👈 unique each time
                        />
                    </div>
                    {(value && !readOnly) && (
                        <button
                            type="button"
                            className="cursor-pointer text-sm mx-2 text-gray-500 hover:text-gray-700"
                            onClick={handleClear}
                        >
                            ✕
                        </button>
                    )}
                </InputBox>

                {(open && !readOnly) && (
                    <ul
                        className="absolute top-full left-0 bg-white rounded-md shadow-md z-50 w-full max-h-[180px] overflow-y-auto thin-scrollbar"
                    >
                        {React.Children.map(children, (child, i) => (
                            <li
                                key={i}
                                className="cursor-pointer hover:bg-gray p-2"
                                onMouseDown={(e) => e.preventDefault()} // prevents blur before click
                                onClick={() => handleSelect(child)}
                            >
                                {child}
                            </li>
                        ))}
                    </ul>
                )}
                {/* supporting info */}
            </div>
            {supportingInfo && (
                <p className="input text-sm text-darker mt-1 italic">{supportingInfo}</p>
            )}
        </div>
    );
}
// Field.List = function List({
//   id,
//   label,
//   width = "hug",
//   placeholder = "",
//   value,
//   onChange,
//   onKeyDown,
//   autoComplete,
//   children,
// }: FieldList) {
//   const [open, setOpen] = useState(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const fieldWidth = {
//     hug: "w-auto",
//     full: "w-full",
//   }[width];

//   const handleClear = () => {
//     if (onChange) {
//       const fakeEvent = {
//         target: { value: "" },
//       } as React.ChangeEvent<HTMLInputElement>;
//       onChange(fakeEvent);
//     }
//   };

//   const handleSelect = (child: React.ReactNode) => {
//     let extractedValue = "";

//     if (React.isValidElement(child)) {
//       const element = child as React.ReactElement<any>;
//       const span = React.Children.toArray(element.props.children).find(
//         (nested): nested is React.ReactElement<any> =>
//           React.isValidElement(nested) && nested.type === "span"
//       );

//       if (span && typeof span.props.children === "string") {
//         extractedValue = span.props.children;
//       } else if (typeof element.props.children === "string") {
//         extractedValue = element.props.children;
//       }
//     }

//     if (onChange) {
//       const fakeEvent = {
//         target: { value: extractedValue },
//       } as React.ChangeEvent<HTMLInputElement>;
//       onChange(fakeEvent);
//     }

//     // Lose focus → closes dropdown
//     inputRef.current?.blur();
//     setOpen(false);
//   };

//   return (
//     <div className={`${fieldWidth} relative`}>
//       {label && <label htmlFor={id}>{label}</label>}

//       <InputBox className="flex justify-between">
//         <input
//           ref={inputRef}
//           id={id}
//           type="text"
//           placeholder={placeholder}
//           className="input"
//           value={value}
//           onChange={onChange}
//           onKeyDown={onKeyDown}
//           onFocus={() => setOpen(true)} // open on focus
//           onBlur={() => setOpen(false)} // close when blurred
//           autoComplete={autoComplete}
//         />
//         {value && (
//           <button
//             type="button"
//             className="cursor-pointer text-sm mx-2 text-gray-500 hover:text-gray-700"
//             onClick={handleClear}
//           >
//             ✕
//           </button>
//         )}
//       </InputBox>

//       {open && (
//         <ul
//           className="absolute top-full left-0 bg-white rounded-md shadow-md z-30 w-full max-h-[180px] overflow-y-auto thin-scrollbar"
//         >
//           {React.Children.map(children, (child, i) => (
//             <li
//               key={i}
//               className="cursor-pointer hover:bg-gray p-2"
//               onMouseDown={(e) => e.preventDefault()} // prevents blur before click
//               onClick={() => handleSelect(child)}
//             >
//               {child}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

Field.Image = function Image({ label, onChange, multiple=false }: {
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean
}) {
    return (
        <div>
            {label && <label htmlFor={label}>{label}</label>}
            <InputBox className="py-[2px] overflow-hidden">
                <input
                    name={label}
                    type="file"
                    multiple={multiple}
                    accept="image/*"
                    onChange={onChange}
                />
            </InputBox>
        </div>

    );
}