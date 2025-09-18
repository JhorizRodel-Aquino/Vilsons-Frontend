import type { Column } from "./Table"; // reuse the Column type

type TableDataProps<T> = {
  row: T;
  column: Column<T>;
};

function TableData<T>({ row, column }: TableDataProps<T>) {
    return (
        <td className="text-base py-[10px]">
            {"\u00A0\u00A0"}
            {column.render ? column.render(row[column.key], row) : String(row[column.key])}
            {"\u00A0\u00A0"}
        </td>
    )
}

export default TableData;