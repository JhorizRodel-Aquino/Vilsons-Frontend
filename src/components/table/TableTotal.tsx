import formatPesoFromCents from '../../utils/formatPesoFromCents';

export default function TableTotal({ total }: {total: number}) {
    return (
        <table className='sticky bottom-0'>
          <thead className='bg-light z-10 shadow-top'>
            <tr>
              <th className='total'>TOTAL</th>
              <th className='total'>{formatPesoFromCents(total)}</th>
            </tr>
          </thead>
        </table>
     
      
        // <div className="flex justify-between font-semibold text-primary sticky bottom-0 bg-light py-[20px] shadow-[0_-2px_4px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.05)]">
        // {/* <div className="flex justify-between font-semibold text-primary"> */}
        //   <p className="px-2">TOTAL</p>
        //   <p className="px-2">{formatPesoFromCents(total)}</p>
        // </div>
    )
}