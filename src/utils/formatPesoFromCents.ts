export default function formatPesoFromCents(cents: number) : string {
    const pesos = cents / 100;
    const formatted = pesos.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatted;
}

