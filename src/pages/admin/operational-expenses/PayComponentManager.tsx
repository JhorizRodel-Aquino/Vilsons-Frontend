import { useMemo, useState } from "react";

export type PayComponent = {
    key: string;       // stable id
    label: string;
    value: number | null;
};

type Props = {
    initialComponents: PayComponent[];      // all possible components (some may be 0/null)
    onChange?: (components: PayComponent[]) => void;
};

export default function PayComponentsManager({ initialComponents, onChange }: Props) {
    const [components, setComponents] = useState<PayComponent[]>(initialComponents);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addingNew, setAddingNew] = useState(false);
    const [newLabel, setNewLabel] = useState("");

    // visible = components with non-zero value (show these as editable rows)
    const visible = useMemo(() => components.filter(c => c.value != null && c.value !== 0), [components]);

    // hidden = components with null or 0 value
    const hidden = useMemo(() => components.filter(c => c.value == null || c.value === 0), [components]);

    const emit = (next: PayComponent[]) => {
        setComponents(next);
        onChange?.(next);
    };

    const showComponent = (key: string) => {
        const next = components.map(c => c.key === key ? { ...c, value: c.value == null ? 0 : c.value } : c);
        emit(next);
        setDropdownOpen(false);
    };

    const updateValue = (key: string, value: number | null) => {
        const next = components.map(c => c.key === key ? { ...c, value } : c);
        emit(next);
    };

    const addNewComponent = () => {
        const label = newLabel.trim();
        if (!label) return;
        const key = `custom_${Date.now()}`;
        const next = [...components, { key, label, value: 0 }];
        emit(next);
        setNewLabel("");
        setAddingNew(false);
        setDropdownOpen(false);
    };

    const removeComponent = (key: string) => {
        const next = components.filter(c => c.key !== key);
        emit(next);
    };

    return (
        <div className="pay-components-manager">
            {/* Visible components (only those with value != 0) */}
            {visible.length === 0 && <p className="text-sm text-muted">No pay components yet.</p>}
            <div className="space-y-2">
                {visible.map(c => (
                    <div key={c.key} className="component-row flex items-center gap-2">
                        <div className="flex-1">
                            <label className="text-sm block">{c.label}</label>
                            <input
                                type="number"
                                step="0.01"
                                className="input w-full"
                                value={c.value ?? ""}
                                onChange={e => {
                                    const val = e.target.value;
                                    const parsed = val === "" ? null : parseFloat(val);
                                    updateValue(c.key, isNaN(parsed as number) ? null : parsed);
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() => updateValue(c.key, 0)} // hide by setting to 0
                                title="Set to zero (hide)"
                            >
                                0
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeComponent(c.key)}
                                title="Remove"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add component dropdown */}
            <div className="mt-3 relative">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setDropdownOpen(s => !s)}
                    aria-expanded={dropdownOpen}
                >
                    Add component
                </button>

                {dropdownOpen && (
                    <div className="dropdown card p-2 mt-2 w-60 shadow">
                        {hidden.length === 0 && !addingNew && <div className="text-sm text-muted px-2 py-1">No remaining components</div>}

                        {hidden.map(h => (
                            <button
                                key={h.key}
                                type="button"
                                className="dropdown-item w-full text-left px-2 py-1 hover:bg-surface"
                                onClick={() => showComponent(h.key)}
                            >
                                {h.label}
                            </button>
                        ))}

                        {/* separator */}
                        <div className="border-t my-2" />

                        {/* "+ New component" entry */}
                        {!addingNew ? (
                            <button
                                type="button"
                                className="dropdown-item w-full text-left px-2 py-1 font-semibold"
                                onClick={() => setAddingNew(true)}
                            >
                                + New component
                            </button>
                        ) : (
                            <div className="px-2 py-1">
                                <input
                                    type="text"
                                    className="input w-full mb-2"
                                    placeholder="Component name"
                                    value={newLabel}
                                    onChange={e => setNewLabel(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <button type="button" className="btn" onClick={addNewComponent}>Add</button>
                                    <button type="button" className="btn" onClick={() => { setAddingNew(false); setNewLabel(""); }}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}