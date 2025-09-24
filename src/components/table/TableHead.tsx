type TableHeadProps = {
    label: string
}

function TableHead({ label }: TableHeadProps) {
    return (
        <th>
            {label}
        </th>
    )
}

export default TableHead;