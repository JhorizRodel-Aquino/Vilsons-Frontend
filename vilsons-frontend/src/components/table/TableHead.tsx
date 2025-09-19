type TableHeadProps = {
    label: string
}

function TableHead({ label }: TableHeadProps) {
    return (
        <th className="text-start text-base font-semibold text-primary py-[20px]">
            {label}
        </th>
    )
}

export default TableHead;