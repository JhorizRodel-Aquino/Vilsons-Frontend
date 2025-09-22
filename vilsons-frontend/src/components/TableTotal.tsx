import formatPesoFromCents from "../utils/formatPesoFromCents";

export default function TableTotal({ value }: {value: number}) {
    return (
        <div className="flex justify-between mx-[20px] text-lg font-semibold text-primary">
            <p className="px-2">Total</p>
            <p className="px-2">{formatPesoFromCents(value)}</p>
        </div>
    )
}