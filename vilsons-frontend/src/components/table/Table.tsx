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
    <div className='px-[20px'>
        <table className='border-collapse w-full divide-y divide-border'>
            <thead>
                <tr>
                {columns.map((col, i) => (
                    <TableHead key={i} label={col.label} />
                ))}
                </tr>
            </thead>
      
            <tbody className='divide-y divide-border'>
                {rows.map((row, i) => (
                    <tr key={i} className=' hover:bg-gray'>
                        {columns.map((col, j) => (
                            <TableData key={j} row={row} column={col} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        {rows.length <= 0 && <p className='text-center my-10 italic'>No Records</p>}
    </div>
  );
}

export default Table;