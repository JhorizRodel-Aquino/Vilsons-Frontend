import type { Column } from "../StandardTable"; // reuse the Column type

type TableDataProps<T> = {
  row: T;
  column: Column<T>;
  depth?: number;
};

function TableData<T>({ row, column, depth = 0 }: TableDataProps<T>) {
    const paddingLeft = 2 * depth + 8;  // 2px * depth + 8px offset (px = 8px)
    return (
        <td className="text-base py-[15px] px-2" style={{ paddingLeft }}>
            {column.render ? column.render(row[column.key], row) : String(row[column.key])}
        </td>
    )
}

export default TableData;