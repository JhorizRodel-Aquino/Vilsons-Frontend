export default function formatPesoToCents(pesoValue: string | number): number {
  // If it's a string like "₱1,234.56", clean it first
  if (typeof pesoValue === "string") {
    const numeric = pesoValue
      .replace(/[^0-9.-]+/g, "") // remove ₱, commas, spaces, etc.
      .trim();

    const pesos = parseFloat(numeric);
    if (isNaN(pesos)) throw new Error("Invalid peso amount");
    return Math.round(pesos * 100);
  }

  // If it's a number, just multiply directly
  return Math.round(pesoValue * 100);
}