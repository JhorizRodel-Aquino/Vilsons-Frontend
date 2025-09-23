import formatPesoFromCents from '../../utils/formatPesoFromCents';

export default function TableTotal({ total }: {total: number}) {
    return (
        <div className="flex justify-between font-semibold text-primary">
          <p className="px-2">TOTAL</p>
          <p className="px-2">{formatPesoFromCents(total)}</p>
        </div>
    )
}