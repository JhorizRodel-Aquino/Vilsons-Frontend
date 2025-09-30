import { useContext, useState } from "react";
import { BackdropContext } from "./../../../components/Main";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import Icon from "../../../components/Icon";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";

type Material = {
    id: number;
    name?: string,
    qty?: number,
    cost?: number
}

export default function CreateOrderModal({ setShowModal }: { setShowModal: (show: boolean) => void }) {
    const setShowBackdrop = useContext(BackdropContext)
    setShowBackdrop!(true);

    const [createNewCustomer, setCreateNewCustomer] = useState(false)
    const [materials, setMaterials] = useState<Material[]>([{ id: 0, name: "", qty: 0, cost: 0 }])

    const addMaterial = () => {
        setMaterials((prev) => [...prev, { id: prev.length + 1, name: "", qty: 0, cost: 0 }]);
    };

    const closeModal = () => {
        setShowModal(false)
        setShowBackdrop!(false);
    }

    return (
        <article className="card modal gap-[20px]">
            <div className="text-xl flex justify-between items-center">
                <h2 className="font-bold text-primary">Create New Job Order</h2>
                <button className="cursor-pointer" onClick={closeModal}>✕</button>
            </div>


            <div className="fields grid gap-[20px]">
                <fieldset className="card">
                    <h3 className="text-lg font-semibold mb-5">Vehicle</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                        <Field.Text label="Plate Number" placeholder="ABC-123" />
                        <Field.Text label="Make" placeholder="Isuzu" />
                        <Field.Text label="Model" placeholder="NLR77" />
                    </div>
                </fieldset>

                <fieldset className="card">
                    <div className="mb-5 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Customer Owner</h3>
                        {createNewCustomer ? <Button variant="outline" label="Cancel" size="mini" onClick={() => setCreateNewCustomer(false)} />
                            : <Button variant="outline" label="New Customer" size="mini" onClick={() => setCreateNewCustomer(true)} />
                        }

                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                        <Field.Text label="Customer Name" />

                        {createNewCustomer &&
                            <>
                                <Field.Text label="Username" />
                                <Field.Number label="Phone Number" />
                                <Field.Text label="Email Address" />
                            </>
                        }
                    </div>
                </fieldset>

                <fieldset className="card">
                    <h3 className="text-lg font-semibold mb-5">Job Description</h3>
                    <Field.TextArea placeholder="Describe the work needed">
                        { }
                    </Field.TextArea>
                </fieldset>

                <fieldset className="card">
                    <h3 className="text-lg font-semibold mb-5">Assign Contractor (Optional)</h3>
                    <div className="flex flex-wrap gap-x-10 gap-y-[20px]">
                        <Field.Text label="Contractor Name" />
                    </div>
                </fieldset>

                <fieldset className="card">
                    <div className="mb-5 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Materials</h3>
                        <Button variant="outline" label="Add Material" size="mini" onClick={addMaterial} />
                    </div>

                    <div className="grid grid-cols-[3fr_1fr_2fr_auto_2fr] gap-x-5 gap-y-[20px] font-semibold">
                        <span>Material</span>
                        <span>Qty</span>
                        <span>Unit Cost (₱)</span>
                        <span className="opacity-0"><Icon name="Delete" /></span>
                        <span className="text-end">Unit Total</span>
                    </div>

                    <ol className="grid gap-2 list-decimal list-inside">
                        {materials.map((material, i) => (
                            <li key={i} className="grid grid-cols-[3fr_1fr_2fr_auto_2fr] gap-x-5 gap-y-[20px]">
                                <Field.Text />
                                <Field.Number />
                                <Field.Text />
                                <button className="mt-auto py-[5px] cursor-pointer" onClick={() => { }}><Icon name="Delete" color="dark" /></button>
                                <p className="py-[5px] text-end">{formatPesoFromCents(10000)}</p>
                            </li>
                        ))}
                    </ol>

                    <dl className="flex justify-between mt-2 font-semibold">
                        <dt>Total</dt>
                        <dd>{formatPesoFromCents(20000)}</dd>
                    </dl>
                </fieldset>

                <div className="grid grid-cols-2 gap-[20px]">
                    <fieldset className="block card">
                        <h3 className="text-lg font-semibold mb-5">Labor Cost (₱)</h3>
                        <Field.Number />
                    </fieldset>

                    <dl className="block card">
                        <dt className="text-lg font-semibold mb-5">Total</dt>
                        <dd className="text-lg font-semibold py-1">{formatPesoFromCents(0)}</dd>
                    </dl>
                </div>
            </div>

            <div className="flex justify-end items-center gap-[20px]">
                <Button variant="gray" label="Cancel" onClick={closeModal} />
                <Button variant="primary" label="Create Job Order" onClick={() => { }} />
            </div>
        </article>
    )
}