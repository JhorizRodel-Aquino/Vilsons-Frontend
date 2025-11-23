import { useEffect, useState } from "react";
import { get } from "../services/apiService";

export default function useFieldList(resource: 'contractors' | 'customers' | 'employees' | 'trucks' | 'jobOrders' | 'overheads', route: string, sel: Record<string, any> | null) {
    const [selected, setSelected] = useState<Record<string, any> | null>(sel);
    const [options, setOptions] = useState<Record<string, any>[]>([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const populateUserOptions = async () => {
            const response = await get({ route: `${route}${search}` })
            const optionList = Array.isArray(response?.data) ? response?.data : response?.data?.[resource];
            console.log("OPTIONS:", optionList)
            setOptions(optionList)
        }
        populateUserOptions()

        if (selected && search !== selected.name) {
            // User typed something else after selecting
            setSelected(null);
        }
    }, [search])

    return {selected, setSelected, options, setOptions, search, setSearch}
}