import type { Column } from "./Table"; // reuse the Column type

type TableDataProps<T> = {
  row: T;
  column: Column<T>;
};

function TableData<T>({ row, column }: TableDataProps<T>) {
    return (
        <td>
            {column.render ? column.render(row[column.key], row) : String(row[column.key])}
        </td>
    )
}

export default TableData;