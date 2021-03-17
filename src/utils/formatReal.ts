export default function formatReal(valor: number): string {
  return `R$ ${valor.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
}
