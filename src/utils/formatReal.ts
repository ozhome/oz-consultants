export default function formatReal(value: number): string {
  const amount = parseFloat(value.toFixed(2));
  const text = amount.toLocaleString('pt-br', { minimumFractionDigits: 2 });

  return `R$ ${text}`;
}
