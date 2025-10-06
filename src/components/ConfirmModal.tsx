import Button from "./Button"; 

type ConfirmModalProps = {
  title?: string;
  message?: string;
  setShowModal: (show: boolean) => void;
  onConfirm: () => void;
  red?: boolean
}

export default function ConfirmModal({ title, message, setShowModal, onConfirm, red }: ConfirmModalProps) {
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    {title && <h3 className="font-bold">{title}</h3>}
                    <button className="cursor-pointer" onClick={closeModal}>✕</button>
                </div>

                {message && <p>{message}</p>}
                
                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    <Button {...(red && {variant: 'red'})} label="Confirm" 
                        onClick={() => {     
                            onConfirm();
                            closeModal();
                        }}
                    />
                </div>
            </article>

            <div className="backdrop"></div>
        </>
    )
}