import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import Icon from "../../components/Icon";
import formatPesoFromCents from "../../utils/formatPesoFromCents";
import Selection, { type SelectionOptions } from "../../components/Selection";
import useFieldList from "../../hooks/useFieldList";
import type { ValidationSchema } from "../../utils/validateAndSanitize";
import validateAndSanitize from "../../utils/validateAndSanitize";
import usePostPutData from "../../hooks/usePostPutData";
import ErrorModal from "../../components/ErrorModal";
import ChangeOwnerModal from "../trucks/ChangeOwnerModal";
import { invalidateCache } from "../../hooks/useGetData";

export type Material = {
    id: number;
    materialName?: string,
    quantity?: number,
    price?: number | null
}

type JobOrdersModalProps = {
    branchOptions?: SelectionOptions[];
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
}

export type FormData = {
    truckId?: string,
    plate?: string,
    make?: string,
    model?: string,
    engine?: string,
    truckImage?: File | null,

    customerId?: string,
    name?: string,
    username?: string,
    phone?: number | string,
    email?: string,
    customerImage?: File | null,

    contractorId?: string,
    contractorName?: string,
    contractorUsername?: string,

    description?: string,

    beforeImages?: File[];
    afterImages?: File[];

    labor?: number | null,
    materials?: Material[],

    branchId?: string,

    remarks?: string
}

const formSchemaGeneral: ValidationSchema = {
    contractorId: { label: "Contractor" },
    description: { required: true },
    labor: { type: "money" },
    materials: {
        children: {
            materialName: { required: true, label: "Material Name" },
            quantity: { required: true, type: "number", label: "Material Quantity", min: 1 },
            price: { required: true, type: "money", label: "Material Cost" },
        },
    },
    branchId: { required: true, label: "Branch" },
    remarks: { required: true }
};

const formSchemaNewTruck: ValidationSchema = {
    plate: { required: true },
    make: { required: true },
    model: { required: true },
};

const formSchemaOldTruck: ValidationSchema = {
    truckId: { required: true, label: "Truck" },
};

const formSchemaNewCustomer: ValidationSchema = {
    name: { required: true, label: 'Customer Name' },
    username: { required: true, label: 'Customer Username' },
    phone: { required: true, label: 'Customer Phone Number' },
    email: { label: 'Customer Email Address' },
};

const formSchemaOldCustomer: ValidationSchema = {
    customerId: { required: true, label: "Customer" },
};

export default function JobOrderModal({ branchOptions, setShowModal, presetData, onSuccess, action, id }: JobOrdersModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/job-orders')
    const [isCreatingNewCustomer, setIsCreatingNewCustomer] = useState(false)
    const [isCreatingNewTruck, setIsCreatingNewTruck] = useState(false)
    const [isCurrentOwner, setIsCurrentOwner] = useState(true)
    const [showTransferModal, setShowTransferModal] = useState<string | null>(null)
    const [materials, setMaterials] = useState<Material[]>([])
    const isSelectingRef = useRef(false);

    const {
        selected: selectedCustomer,
        setSelected: setSelectedCustomer,
        options: customerOptions,
        setOptions: setCustomerOptions,
        search: customerSearch,
        setSearch: setCustomerSearch
    } = useFieldList("customers", "/api/customers?search=", null)
    const {
        selected: selectedContractor,
        setSelected: setSelectedContractor,
        options: contractorOptions,
        setOptions: setContractorOptions,
        search: contractorSearch,
        setSearch: setContractorSearch
    } = useFieldList("contractors", "/api/contractors?search=", null)
    const {
        selected: selectedTruck,
        setSelected: setSelectedTruck,
        options: truckOptions,
        setOptions: setTruckOptions,
        search: truckSearch,
        setSearch: setTruckSearch
    } = useFieldList("trucks", "/api/trucks?search=", null)

    useEffect(() => {
        if (action === "edit") {
            setSelectedTruck({
                id: formData.truckId,
                name: formData.plate,
                make: formData.make,
                model: formData.model,
                customerId: formData.customerId,
                customerFullName: formData.name,
                customerUsername: formData.username
            });
            setTruckSearch(formData.plate || "");

            if (formData.contractorId) {
                setSelectedContractor({
                    id: formData.contractorId,
                    name: formData.contractorName,
                    username: formData.contractorUsername,
                });
                setContractorSearch(formData.contractorName || "");
            }

            setMaterials([...materials, ...(formData.materials || [])])
        }
    }, [])

    useEffect(() => {
        setFormData({ ...formData, customerId: selectedCustomer?.id })
    }, [selectedCustomer])

    useEffect(() => {
        setFormData({ ...formData, contractorId: selectedContractor?.id })
    }, [selectedContractor])

    useEffect(() => {
        setFormData({ ...formData, truckId: selectedTruck?.id })
        if (!selectedTruck) resetSelectedCustomer()
        if (isCurrentOwner) selectTruckCurrentOwner()
    }, [selectedTruck])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const truckSchema = isCreatingNewTruck ? formSchemaNewTruck : formSchemaOldTruck
        const customerSchema = isCreatingNewCustomer ? formSchemaNewCustomer : formSchemaOldCustomer
        const formSchema = { ...formSchemaGeneral, ...truckSchema, ...customerSchema }
        const { validatedData, isValid } = validateAndSanitize({ ...formData, materials: materials }, formSchema);
        console.log(validatedData)
        if (!isValid) return;

        const multipartFormData = new FormData();
        Object.entries(validatedData).map(([key, value]) => {
            if (key === "beforeImages") {
                value.forEach((file: File) => multipartFormData.append("beforeImages", file));
                return;
            } else if (key === "afterImages") {
                value.forEach((file: File) => multipartFormData.append("afterImages", file));
                return;
            } else if (value instanceof File) {
                multipartFormData.append(key, value);
                return;
            }

            // if (!value) return 

            if (key === "contractorName" || key === "contractorUsername") return;

            value = Array.isArray(value) ? JSON.stringify(value) : value;
            multipartFormData.append(key, value)
        })

        const success = action === 'create' ? await postData(multipartFormData) : await putData(id, multipartFormData)

        if (success) {
            onSuccess();
            setFormData({
                truckId: '', plate: '', make: '', model: '',
                customerId: '', name: '', username: '', phone: '', email: '',
                contractorId: '', description: '', labor: null, branchId: branchOptions && branchOptions[0].value
            });
            setContractorOptions([])
            setCustomerOptions([])
            setTruckOptions([])
            closeModal();

            invalidateCache(`/api/job-orders/${id}`);
            invalidateCache(`/api/contractors/${formData.contractorId}`);
            invalidateCache(`/api/customers/${formData.customerId}`);
            invalidateCache(`/api/trucks/${formData.truckId}`);
            invalidateCache(`/api/materials`);
            invalidateCache(`/api/finances`);
            invalidateCache(`/api/approval-logs`);
            invalidateCache(`/api/activity-logs`);

            invalidateCache(`/api/dashboard/customer-balance`);
            invalidateCache(`/api/dashboard/expenses`);
            invalidateCache(`/api/dashboard/job-orders`);
            invalidateCache(`/api/dashboard/profit`);
            invalidateCache(`/api/dashboard/revenue`);
            invalidateCache(`/api/dashboard/revenue-profit-chart`);
        }
    };

    const handleSelectCustomer = (customer: any) => {
        setSelectedCustomer({
            id: customer.user.customerId,
            name: customer.user.fullName,
            username: customer.user.username,
        });
        setCustomerSearch(customer.user.fullName); // show name in input
    };

    const handleSelectContractor = (contractor: any) => {
        setSelectedContractor({
            id: contractor.user.contractorId,
            name: contractor.user.fullName,
            username: contractor.user.username,
        });
        setContractorSearch(contractor.user.fullName); // show name in input
    };

    const handleSelectTruck = (truck: any) => {
        setSelectedTruck({
            id: truck.id,
            name: truck.plate,
            make: truck.make,
            model: truck.model,
            customerId: truck.customerId,
            customerFullName: truck.customerFullName,
            customerUsername: truck.customerUsername
        });
        setTruckSearch(truck.plate); // show name in input
    };

    const selectTruckCurrentOwner = () => {
        if (!selectedTruck) return

        setSelectedCustomer({
            id: selectedTruck.customerId,
            name: selectedTruck.customerFullName,
            username: selectedTruck.customerUsername
        })
        setCustomerSearch(selectedTruck.customerFullName);
    }

    const resetSelectedCustomer = () => {
        setSelectedCustomer(null);
        setCustomerSearch("");
    }

    const resetSelectedTruck = () => {
        setSelectedTruck(null);
        setTruckSearch("");
    }

    const addMaterial = () => {
        setMaterials((prev) => [...prev, { id: prev.length + 1, materialName: "", quantity: 1, price: null } as Material]);
    };

    const removeMaterial = (id: number) => {
        setMaterials((prev) => prev.filter((mat) => mat.id !== id));
    };

    const closeModal = () => {
        setShowModal(null)
        setContractorOptions([])
        setCustomerOptions([])
        setTruckOptions([])
    }

    console.log("FORM:", formData)

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h3 className="font-bold">{action === "create" ? 'Add Job Order' : 'Edit Job Order'}</h3>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <fieldset>
                            Branch
                            <Selection
                                options={branchOptions}
                                value={formData.branchId}
                                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                            />
                        </fieldset>

                        <div className="fields grid gap-[20px]">
                            <fieldset className="card">
                                <div className="mb-5 flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">{isCreatingNewTruck ? 'New Truck' : 'Truck'}</h4>
                                    {action === "create" && (
                                        isCreatingNewTruck ?
                                            <Button variant="outline" label="Cancel" size="mini" onClick={() => {
                                                setIsCreatingNewTruck(false)
                                                setFormData({ ...formData, plate: '', make: '', model: '' })
                                            }} />
                                            : <Button variant="outline" label="New Truck" size="mini" onClick={() => {
                                                setIsCreatingNewTruck(true)
                                                resetSelectedTruck()
                                            }} />
                                    )}
                                </div>

                                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                    {isCreatingNewTruck ?
                                        <>
                                            <Field.Image
                                                label="Truck Picture"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        truckImage: e.target.files ? e.target.files[0] : null,
                                                    })}
                                            />
                                            <Field.Text
                                                id="plate"
                                                label="Plate Number"
                                                value={formData.plate}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, plate: e.target.value });
                                                }}
                                            />
                                            <Field.Text
                                                id="make"
                                                label="Make"
                                                value={formData.make}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, make: e.target.value });
                                                }}
                                            />
                                            <Field.Text
                                                id="model"
                                                label="Model"
                                                value={formData.model}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, model: e.target.value });
                                                }}
                                            />
                                            <Field.Text
                                                id="engine"
                                                label="Engine"
                                                value={formData.engine}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, engine: e.target.value });
                                                }}
                                            />
                                        </>
                                        :
                                        <Field.List
                                            id="truckSelection"
                                            placeholder="Select Truck"
                                            validated={!!selectedTruck}
                                            readOnly={action === "edit"}
                                            value={truckSearch}
                                            supportingInfo={selectedTruck ? `${selectedTruck.make} ${selectedTruck.model}` : ""}
                                            onChange={(e) => setTruckSearch(e.target.value)}
                                            onBlur={() => {
                                                if (isSelectingRef.current) return;
                                                if (!selectedTruck || truckSearch !== selectedTruck.name) setSelectedTruck(null);
                                            }}
                                        >
                                            {truckOptions.map((truck, i) => (
                                                <div
                                                    key={i}
                                                    onMouseDown={() => {
                                                        isSelectingRef.current = true;
                                                    }}
                                                    onMouseUp={() => {
                                                        handleSelectTruck(truck);
                                                        setTimeout(() => {
                                                            isSelectingRef.current = false;
                                                        }, 0);
                                                    }}
                                                    onMouseLeave={() => {
                                                        if (isSelectingRef.current) {
                                                            setTimeout(() => {
                                                                isSelectingRef.current = false;
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <span>{truck.plate}</span>
                                                    <p className="text-sm text-darker">
                                                        {truck.make} {truck.model}
                                                    </p>
                                                </div>
                                            ))}
                                        </Field.List>
                                    }
                                </div>
                            </fieldset>

                            <fieldset className="card">
                                <div className="mb-5 flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">{!isCreatingNewTruck && isCreatingNewCustomer ? 'Transfer to New Owner' : !isCurrentOwner ? 'Transfer to Existing Owner' : 'Customer Owner'}</h4>

                                    {action === "create" && (
                                        isCreatingNewCustomer ?
                                            isCreatingNewTruck ?
                                                <Button variant="outline" label="Cancel" size="mini" onClick={() => {
                                                    setIsCreatingNewCustomer(false)
                                                    setFormData({ ...formData, name: '', username: '', phone: '', email: '' })
                                                }} />
                                                : <Button variant="outline" label="Cancel" size="mini" onClick={() => {
                                                    setIsCreatingNewCustomer(false)
                                                    selectTruckCurrentOwner()
                                                }} />
                                            : !isCreatingNewTruck && !isCurrentOwner ?
                                                <Button variant="outline" label="Cancel" size="mini" onClick={() => {
                                                    setIsCurrentOwner(true)
                                                    selectTruckCurrentOwner()
                                                }} />
                                                :
                                                <div className="flex gap-[20px]">
                                                    {(!isCreatingNewTruck && selectedTruck) && <Button variant="outline" label="Transfer to Existing Owner" size="mini" onClick={() => {
                                                        setIsCurrentOwner(!isCurrentOwner)
                                                        resetSelectedCustomer()
                                                    }} />}
                                                    {(isCreatingNewTruck || selectedTruck) && <Button variant="outline" label={isCreatingNewTruck ? "New Owner" : "Transfer to New Owner"} size="mini" onClick={() => {
                                                        setIsCreatingNewCustomer(true)
                                                        resetSelectedCustomer();
                                                    }} />}
                                                </div>
                                    )}



                                </div>

                                {isCreatingNewCustomer ?
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                        <Field.Image
                                            label="Profile Picture"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    customerImage: e.target.files ? e.target.files[0] : null,
                                                })}
                                        />

                                        <Field.Text
                                            id="customerName"
                                            label="Name"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({ ...formData, name: e.target.value });
                                            }}
                                        />
                                        <Field.Text
                                            id="customerUsername"
                                            label="Username"
                                            value={formData.username}
                                            onChange={(e) => {
                                                setFormData({ ...formData, username: e.target.value });
                                            }}
                                        />
                                        <Field.Number
                                            id="phone"
                                            label="Phone Number"
                                            noSpinner={true}
                                            value={formData.phone || ""}
                                            onChange={(e) => {
                                                setFormData({ ...formData, phone: +e.target.value });
                                            }}
                                        />
                                        <Field.Email
                                            id="email"
                                            label="Email Address"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                            }}
                                        />
                                    </div>
                                    :
                                    <div className="grid gap-[10px]">
                                        <Field.List
                                            id="customerSelection"
                                            placeholder="Select Customer Owner"
                                            validated={!!selectedCustomer}
                                            readOnly={(isCurrentOwner && !isCreatingNewTruck) || action === "edit"}
                                            value={customerSearch}
                                            supportingInfo={selectedCustomer ? `@${selectedCustomer.username}` : ""}
                                            onChange={(e) => setCustomerSearch(e.target.value)}
                                            onBlur={() => {
                                                if (isSelectingRef.current) return;
                                                if (!selectedCustomer || customerSearch !== selectedCustomer.name) setSelectedCustomer(null);
                                            }}
                                        >
                                            {customerOptions.map((customer, i) => (
                                                <div
                                                    key={i}
                                                    onMouseDown={() => {
                                                        isSelectingRef.current = true;
                                                    }}
                                                    onMouseUp={() => {
                                                        handleSelectCustomer(customer);
                                                        setTimeout(() => {
                                                            isSelectingRef.current = false;
                                                        }, 0);
                                                    }}
                                                    onMouseLeave={() => {
                                                        if (isSelectingRef.current) {
                                                            setTimeout(() => {
                                                                isSelectingRef.current = false;
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <span>{customer.user.fullName}</span>
                                                    <p className="text-sm text-darker">@{customer.user.username}</p>
                                                </div>
                                            ))}
                                        </Field.List>
                                    </div>
                                }
                            </fieldset>

                            <fieldset className="card">
                                <h4 className="text-lg font-bold mb-5">Contractor <small className="font-normal">(Optional)</small></h4>

                                <Field.List
                                    id="contractorSelection"
                                    placeholder="Select Contractor"
                                    validated={!!selectedContractor}
                                    value={contractorSearch}
                                    supportingInfo={selectedContractor ? `@${selectedContractor.username}` : ""}
                                    onChange={(e) => setContractorSearch(e.target.value)}
                                    onBlur={() => {
                                        if (isSelectingRef.current) return;
                                        if (!selectedContractor || contractorSearch !== selectedContractor.name) setSelectedContractor(null);
                                    }}
                                >
                                    {contractorOptions.map((contractor, i) => (
                                        <div
                                            key={i}
                                            onMouseDown={() => {
                                                isSelectingRef.current = true;
                                            }}
                                            onMouseUp={() => {
                                                handleSelectContractor(contractor);
                                                setTimeout(() => {
                                                    isSelectingRef.current = false;
                                                }, 0);
                                            }}
                                            onMouseLeave={() => {
                                                if (isSelectingRef.current) {
                                                    setTimeout(() => {
                                                        isSelectingRef.current = false;
                                                    }, 0);
                                                }
                                            }}
                                        >
                                            <span>{contractor.user.fullName}</span>
                                            <p className="text-sm text-darker">@{contractor.user.username}</p>
                                        </div>
                                    ))}
                                </Field.List>
                            </fieldset>

                            <fieldset className="card">
                                <h4 className="text-lg font-semibold mb-5">Job Description</h4>
                                <Field.TextArea
                                    id="description"
                                    placeholder="Describe the work needed"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </fieldset>

                            <fieldset className="card">
                                <h4 className="text-lg font-bold mb-5">Documentation</h4>

                                <div className="grid gap-y-[20px]">
                                    <Field.Image
                                        label="Before"
                                        multiple={true}
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            setFormData({ ...formData, beforeImages: files });
                                        }}
                                    />
                                    <Field.Image
                                        label="After"
                                        multiple={true}
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            setFormData({ ...formData, afterImages: files });
                                        }}

                                    />
                                </div>
                            </fieldset>

                            <fieldset className="card">
                                <div className="mb-5 flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">Materials</h4>
                                    <Button variant="outline" label="Add Material" size="mini" onClick={addMaterial} />
                                </div>

                                {materials.length > 0 &&
                                    <>
                                        <div className="grid grid-cols-[3fr_1fr_2fr_auto_2fr] gap-x-5 gap-y-[20px] font-semibold">
                                            <span>Material</span>
                                            <span>Qty</span>
                                            <span>Cost</span>
                                            <span className="opacity-0"><Icon name="Delete" /></span>
                                            <span></span>
                                        </div>

                                        <ol className="grid gap-2 list-decimal list-inside">
                                            {materials.map((material, i) => (
                                                <li key={i} id={`${material.id}`} className="grid grid-cols-[3fr_1fr_2fr_auto_2fr] gap-x-5 gap-y-[20px]">
                                                    <Field.Text
                                                        id={`${material.id}-name`}
                                                        value={material.materialName}
                                                        onChange={(e) => {
                                                            const updatedMaterials = materials.map((mat) =>
                                                                mat.id === material.id
                                                                    ? { ...mat, materialName: e.target.value }
                                                                    : mat
                                                            );
                                                            setMaterials(updatedMaterials)
                                                        }}
                                                    />
                                                    <Field.Number
                                                        id={`${material.id}-quantity`}
                                                        min={1}
                                                        value={material.quantity}
                                                        onChange={(e) => {
                                                            const updatedMaterials = materials.map((mat) =>
                                                                mat.id === material.id
                                                                    ? { ...mat, quantity: +e.target.value }
                                                                    : mat
                                                            );
                                                            setMaterials(updatedMaterials)
                                                        }}
                                                    />
                                                    <Field.Money
                                                        id={`${material.id}-price`}
                                                        value={material.price}
                                                        onChange={(values) => {
                                                            const updatedMaterials = materials.map((mat) =>
                                                                mat.id === material.id
                                                                    ? { ...mat, price: values.floatValue ?? null }
                                                                    : mat
                                                            );
                                                            setMaterials(updatedMaterials)
                                                        }}
                                                    />
                                                    <button type="button" className="mt-auto py-[5px] cursor-pointer" onClick={() => removeMaterial(material.id)}><Icon name="delete" color="dark" /></button>
                                                    <p className="py-[5px] text-end">{formatPesoFromCents((material.price || 0) * (material.quantity || 0) * 100)}</p>
                                                </li>
                                            ))}
                                        </ol>

                                        <dl className="flex justify-between mt-3 font-semibold">
                                            <dt>Total</dt>
                                            <dd>
                                                {formatPesoFromCents(
                                                    materials.reduce(
                                                        (total, material) => total + ((material.price || 0) * (material.quantity || 0) * 100),
                                                        0
                                                    )
                                                )}
                                            </dd>
                                        </dl>
                                    </>
                                }
                            </fieldset>

                            <div className="grid grid-cols-2 gap-[20px]">
                                <fieldset className="block card">
                                    <h4 className="text-lg font-semibold mb-5">Labor Cost (₱)</h4>
                                    <Field.Money
                                        id="amount"
                                        label="Amount"
                                        value={formData.labor}
                                        onChange={(values) => {
                                            setFormData({ ...formData, labor: values.floatValue ?? null });
                                        }}
                                    />
                                </fieldset>

                                <dl className="block card">
                                    <dt className="text-lg font-semibold mb-5">Total</dt>
                                    <dd className="text-lg font-semibold py-1">
                                        {formatPesoFromCents(
                                            materials.reduce(
                                                (total, material) => total + ((material.price || 0) * (material.quantity || 0) * 100),
                                                0
                                            ) + ((formData.labor || 0) * 100)
                                        )}
                                    </dd>
                                </dl>
                            </div>

                            {action === 'edit' &&
                                <fieldset className="card">
                                    <h4 className="text-lg font-bold mb-3">Remarks</h4>
                                    <Field.TextArea
                                        id="remarks"
                                        value={formData.remarks}
                                        onChange={(e) => {
                                            setFormData({ ...formData, remarks: e.target.value });
                                        }}
                                    />
                                </fieldset>
                            }
                        </div>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} />
                            {action === 'create'
                                ? <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add Job Order"} disabled={loading} />
                                : <Button type="submit" variant="primary" label={loading ? "Saving..." : "Save"} disabled={loading} />
                            }
                        </div>
                    </form >

                    <div className="backdrop"></div>

                    {(selectedTruck && showTransferModal) && <ChangeOwnerModal setShowModal={setShowTransferModal} onSuccess={console.log} truckId={selectedTruck.id} selectedTruck={selectedTruck as any} invalidateData={{ customerId: formData.customerId }} />}
                </>
            }
        </>
    )
}