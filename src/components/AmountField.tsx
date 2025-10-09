import { NumericFormat } from "react-number-format";
import { useState } from "react";

export default function AmountFormat() {
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="amount" className="font-medium">Amount</label>

      <NumericFormat
        id="amount"
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        placeholder="0.00"
        className="border p-2 rounded text-right font-mono w-40"
        value={amount ?? ""}
        onValueChange={(values) => {
          setAmount(values.floatValue ?? null);
        }}
      />
    </div>
  );
}
