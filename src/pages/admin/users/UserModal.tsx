import Button from "../../../components/Button";
import Field from "../../../components/Field";

export default function UserModal({ setShowModal }: { setShowModal: (show: boolean) => void }) {
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    <h2 className="font-bold">Add User</h2>
                    <button className="cursor-pointer" onClick={closeModal}>✕</button>
                </div>

                <fieldset className="card">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                        <Field.Text label="Name"/>
                        <Field.Text label="Userame"/>
                        <Field.Email label="Email Address"/>
                        <Field.Number label="Phone Number"/>
                        <Field.Text label="Roles"/>
                    </div>
                </fieldset>

                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    <Button variant="primary" label="Create Job Order" onClick={() => { }} />
                </div>
            </article>

            <div className="backdrop"></div>
        </>
    )
}