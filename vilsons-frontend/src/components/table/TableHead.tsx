type TableHeadProps = {
    label: string
}

function TableHead({ label }: TableHeadProps) {
    return (
        <th className="text-start text-base font-semibold text-primary py-[20px]">
            {"\u00A0\u00A0"}
            {label}
            {"\u00A0\u00A0"}
        </th>
    )
}

export default TableHead;