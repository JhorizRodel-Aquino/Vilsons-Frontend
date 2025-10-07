type ErrorModalProps = {
  error?: string;
  closeError: () => void;
}

export default function ErrorModal({ error, closeError }: ErrorModalProps) {
    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex items-center">
                    {/* {title && <h3 className="font-bold mr-auto">{title}</h3>} */}
                    <h3 className="font-bold mr-auto">Error</h3>
                    <button className="cursor-pointer ml-auto" onClick={closeError}>✕</button>
                </div>

                {error && <p>{error}</p>}
                 
                {/*<div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Close" onClick={closeModal} />
                </div> */}
            </article>

            <div className="backdrop"></div>
        </>
    )
}