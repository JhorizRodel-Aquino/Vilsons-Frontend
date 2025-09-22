import TableHead from './TableHead';
import TableData from './TableData';

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

// export type Column<T, K extends keyof T = keyof T> = {
//   key: K;
//   label: string;
//   render?: (value: T[K], row: T) => React.ReactNode;
// };

type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  setHR?: boolean;
};

function Table<T>({ columns, rows, setHR = false }: TableProps<T>) {
  return (
    <div className='mx-[20px]'>
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

        {setHR && <hr/>}

        {rows.length <= 0 && <p className='text-center my-10 italic'>No Records</p>}
    </div>
  );
}

export default Table;