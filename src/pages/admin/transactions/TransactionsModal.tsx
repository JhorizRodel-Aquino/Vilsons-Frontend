import Button from "../../../components/Button";
import Field from "../../../components/Field";

export default function TransactionModal({ setShowModal }: { setShowModal: (show: boolean) => void }) {
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    <h2 className="font-bold">Add Transaction</h2>
                    <button className="cursor-pointer" onClick={closeModal}>✕</button>
                </div>

                <fieldset className="card">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                        <Field.Text label="Reference Number" />
                        <Field.Text label="Job Number" placeholder="JO-XX-XXX" />
                        <Field.Text label="Sender Name" />
                        <Field.Text label="Mode of Payment" />
                        <Field.Money label="Amount" />
                    </div>
                </fieldset>

                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    <Button variant="primary" label="Add Transaction" onClick={() => { }} />
                </div>
            </article>

            <div className="backdrop"></div>
        </>
    )
}