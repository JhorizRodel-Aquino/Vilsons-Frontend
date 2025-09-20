import type { Column } from "./Table"; // reuse the Column type

type TableDataProps<T> = {
  row: T;
  column: Column<T>;
};

function TableData<T>({ row, column }: TableDataProps<T>) {
    return (
        <td className="text-base py-[15px] px-2">
            {column.render ? column.render(row[column.key], row) : String(row[column.key])}
        </td>
    )
}

export default TableData;