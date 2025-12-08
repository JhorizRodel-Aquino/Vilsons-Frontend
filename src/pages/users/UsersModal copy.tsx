import { useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import usePostPutData from "../../hooks/usePostPutData";
import type { SelectionOptions } from "../../components/Selection";
import type { ValidationSchema } from "../../utils/validateAndSanitize";
import validateAndSanitize from "../../utils/validateAndSanitize";

export type FormData = {
    name?: string;
    username?: string;
    phone?: string;
    email?: string;
    rolesId?: string[];
    branchId?: string[];
};

const formSchema: ValidationSchema = {
    name: { required: true },
    username: { required: true },
    email: { required: true },
    phone: { required: true, label: "Phone Number" },
    rolesId: { required: true, label: "Roles" },
    branchId: { required: true, label: "Branches" }
};

type UsersModalProps = {
    branchOptions?: SelectionOptions[];
    roleOptions?: SelectionOptions[];
    setShowModal: (action: "create" | "edit" | null) => void;
    onSuccess: () => void;
    action: "create" | "edit";
    presetData: FormData;
    id?: string;
};

export default function UsersModal({
    branchOptions = [],
    roleOptions = [],
    setShowModal,
    onSuccess,
    action,
    presetData,
    id
}: UsersModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData);
    const { loading, error, closeError, postData, putData } = usePostPutData("/api/users");
    const isSelectingRef = useRef(false);

    const closeModal = () => {
        setShowModal(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const success =
            action === "create"
                ? await postData(validatedData)
                : await putData(id, validatedData);
        if (success) {
            onSuccess();
            setFormData({});
            closeModal();
        }
    };

    const toggleSelection = (key: "rolesId" | "branchId", value: string) => {
        setFormData((prev) => {
            const existing = prev[key] || [];
            const updated = existing.includes(value)
                ? existing.filter((v) => v !== value)
                : [...existing, value];
            return { ...prev, [key]: updated };
        });
    };

    console.log(formData)

    return (
        <>
            <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    <h2 className="font-bold">
                        {action === "edit" ? "Edit User" : "Add User"}
                    </h2>
                    <button type="button" className="cursor-pointer" onClick={closeModal}>
                        ✕
                    </button>
                </div>

                <fieldset className="card space-y-5">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                        <Field.Text
                            id="name"
                            label="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Field.Text
                            id="username"
                            label="Username"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({ ...formData, username: e.target.value })
                            }
                        />
                        <Field.Email
                            id="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        <Field.Number
                            id="phone"
                            label="Phone Number"
                            noSpinner
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />
                    </div>

                    {/* Branches Multi-Select */}
                    <div>
                        <label className="font-semibold block mb-2">Branches</label>
                        <div className="flex flex-wrap gap-2">
                            {branchOptions.map((branch) => (
                                <button
                                    key={branch.value}
                                    type="button"
                                    onClick={() => toggleSelection("branchId", branch.value)}
                                    className={`px-3 py-1 rounded-full border ${formData.branchId?.includes(branch.value)
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-100 text-gray-700 border-gray-300"
                                        } transition-all`}
                                >
                                    {branch.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Roles Multi-Select */}
                    <div>
                        <label className="font-semibold block mb-2">Roles</label>
                        <div className="flex flex-wrap gap-2">
                            {roleOptions.map((role) => (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => toggleSelection("rolesId", role.value)}
                                    className={`px-3 py-1 rounded-full border ${formData.rolesId?.includes(role.value)
                                        ? "bg-primary text-white border-primary"
                                        : "bg-gray-100 text-gray-700 border-gray-300"
                                        } transition-all`}
                                >
                                    {role.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </fieldset>

                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    {action === 'create'
                        ? <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add Income"} disabled={loading} />
                        : <Button type="submit" variant="primary" label={loading ? "Saving..." : "Save"} disabled={loading} />
                    }
                </div>
            </form>

            <div className="backdrop"></div>
        </>
    );
}
