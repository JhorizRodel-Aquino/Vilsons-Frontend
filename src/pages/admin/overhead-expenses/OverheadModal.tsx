import Button from "../../../components/Button";
import Field from "../../../components/Field";

export default function OverheadModal({ setShowModal }: { setShowModal: (show: boolean) => void }) {
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    <h2 className="font-bold">Add Bill</h2>
                    <button className="cursor-pointer" onClick={closeModal}>✕</button>
                </div>

                <fieldset className="card">
                    <div className="grid gap-x-10 gap-y-[20px]">
                        <Field.Text label="Description" placeholder="Electric Bill"/>
                        <Field.Money label="Amount"/>
                    </div>
                </fieldset>

                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    <Button variant="primary" label="Add Bill" onClick={() => { }} />
                </div>
            </article>

            <div className="backdrop"></div>
        </>
    )
}