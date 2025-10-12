import TableHead from './TableHead';
import TableData from './TableData';
import TableTotal from './TableTotal';

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
  total?: number;
  className?: string;
  withOptions?: boolean
};

export default function Table<T>({ columns, rows, total, className, withOptions = false }: TableProps<T>) {
  return (
    <div className={`table-section`}>
      <div className={`table-container main ${className || ''}`}>
        <table className={`${withOptions && 'withOptions'}`}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                  <TableHead key={i} label={col.label} />
              ))}
            </tr>
            
          </thead>
    
          <tbody className='divide-y divide-border'>
            {rows.map((row, i) => (
                <tr key={i} className='hover:bg-gray'>
                  {columns.map((col, j) => (
                    <TableData key={j} row={row} column={col} />
                  ))}
                </tr>
            ))}
          </tbody>
        </table>

        {total !== undefined && rows.length > 0 && (
          <TableTotal total={total}/>
        )}

        {rows.length <= 0 && <p className='text-center my-10 italic'>No Records</p>}
      </div>
    </div>
  );
}