type MessageModalProps = {
  title?: string;
  message?: string;
  setShowModal: (show: boolean) => void;
}

export default function MessageModal({ title, message, setShowModal }: MessageModalProps) {
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex items-center">
                    {title && <h3 className="font-bold mr-auto">{title}</h3>}
                    <button className="cursor-pointer ml-auto" onClick={closeModal}>✕</button>
                </div>

                {message && <p>{message}</p>}
                 
                {/*<div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Close" onClick={closeModal} />
                </div> */}
            </article>

            <div className="backdrop"></div>
        </>
    )
}