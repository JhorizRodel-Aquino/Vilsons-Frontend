import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import Tabs from "../../../components/Tabs";
import Detail from "../../../components/Detail"
import formatPesoFromCents from "../../../utils/formatPesoFromCents";

export default function LaborModal({ setShowModal }: { setShowModal: (show: boolean) => void }) {
    const tabs = ['contractor', 'employee'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <article className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    <h3 className="font-bold">Pay Laborer</h3>
                    <button className="cursor-pointer" onClick={closeModal}>✕</button>
                </div>

                <div>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    {activeTab === tabs[0] &&
                        <fieldset className="card">
                            <div className="grid gap-[20px]">
                                <Field.Text label="Contractor Name" />

                                <div className="flex justify-between">
                                    <h4 className="text-lg font-bold">Net Pay</h4>
                                    <p className="text-lg font-bold">{formatPesoFromCents(100000)}</p>
                                </div>


                                <Field.Money label="Amount" />


                                <div className="card">
                                    <h4 className="text-lg font-bold mb-3">Summary</h4>
                                    <div className="grid gap-1">
                                        <Detail className="font-medium" label='Regular' value={formatPesoFromCents(100000)} variant="adjacent" align="between" />
                                        <Detail className="font-medium" label='Advance' value={formatPesoFromCents(100000)} variant="adjacent" align="between" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    }

                    {activeTab === tabs[1] &&
                        <fieldset className="card">
                            <div className="grid gap-[20px]">
                                <Field.Text label="Employee Name" />

                                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                    <Field.Money label="Basic" />
                                    <Field.Money label="Food" />
                                    <Field.Money label="Transportation" />
                                    <Field.Money label="Medical" />
                                </div>

                                <div className="card">
                                    <h4 className="text-lg font-bold mb-3">Summary</h4>
                                    <Detail className="font-medium" label='Total Salary' value={formatPesoFromCents(100000)} variant="adjacent" align="between" />
                                </div>
                            </div>
                        </fieldset>
                    }
                </div>

                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    <Button variant="primary" label="Pay Laborer" onClick={() => { }} />
                </div>
            </article>

            <div className="backdrop"></div>
        </>
    )
}