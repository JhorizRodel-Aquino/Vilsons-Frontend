import type { ReactNode } from "react";

function Table({ children }: {children: ReactNode}) {
  return (
    <table className='border-collapse w-full divide-y divide-border'>
      {children}
    </table>
  );
}

export default Table;