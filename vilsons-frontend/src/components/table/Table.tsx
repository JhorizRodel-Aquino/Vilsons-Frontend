import TableHead from './TableHead';
import TableData from './TableData';

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};

function Table<T>({ columns, rows }: TableProps<T>) {
  return (
    <div className='px-[20px]'>
        <table className='border-collapse w-full'>
            <thead>
                <tr className='border-b'>
                {columns.map((col, i) => (
                    <TableHead key={i} label={col.label} />
                ))}
                </tr>
            </thead>
      
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className='border-b hover:bg-gray'>
                        {columns.map((col, j) => (
                            <TableData key={j} row={row} column={col} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Table;