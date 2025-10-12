import Button from "./Button"; 

type ConfirmModalProps = {
  title?: string;
  message?: string;
//   setShowModal: (show: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
  red?: boolean;
  disabledButtons?: boolean;
  onProgressLabel?: string;
}

export default function ConfirmModal({ title, message, onClose, onConfirm, red, disabledButtons, onProgressLabel }: ConfirmModalProps) {
    // const closeModal = () => {
    //     setShowModal(false)
    // }

    return (
        <>
            <article className="card modal gap-[20px] z-40">
                <div className="text-xl flex justify-between items-center">
                    {title && <h3 className="font-bold">{title}</h3>}
                    <Button.X onClick={onClose} disabled={disabledButtons} />
                </div>

                {message && <p>{message}</p>}
                
                <div className="flex justify-end items-center gap-[20px]">
                    <Button disabled={disabledButtons} variant="gray" label="Cancel" onClick={onClose} />
                    <Button disabled={disabledButtons} {...(red && {variant: 'red'})} label={onProgressLabel ? onProgressLabel : `Confirm`}
                        onClick={() => {     
                            onConfirm();
                        }}
                    />
                </div>
            </article>

            <div className="backdrop"></div>
        </>
    )
}