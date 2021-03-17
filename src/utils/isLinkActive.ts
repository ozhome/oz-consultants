export default function isLinkActive(date: Date, minutes: number): string {
  const now = new Date();
  const create = new Date(date);
  const expires = new Date(create.getTime() + minutes * 60000);

  if (expires.getTime() > now.getTime()) return 'Ativo';
  return 'Inativo';
}
