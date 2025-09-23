import Table from './table/Table';
import TableHead from './table/TableHead';
import TableData from './table/TableData';
import formatPesoFromCents from "../utils/formatPesoFromCents";

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
};

export default function StandardTable<T>({ columns, rows, total }: TableProps<T>) {
  return (
    <div className='mx-[20px] divide-y divide-border grid gap-[20px]'>
      <Table>
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
      </Table>

      {total !== undefined && rows.length > 0 && (
        <div className="flex justify-between text-lg font-semibold text-primary">
          <p className="px-2">Total</p>
          <p className="px-2">{formatPesoFromCents(total)}</p>
        </div>
      )}

      {rows.length <= 0 && <p className='text-center my-10 italic'>No Records</p>}
    </div>
  );
}