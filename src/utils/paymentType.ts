export default function paymentType(value: string): string {
  if (value === 'credit') return 'Crédito';
  if (value === 'pix') return 'Pix';
  return 'Boleto';
}
