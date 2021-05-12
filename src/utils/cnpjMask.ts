export default function (zip: string): string {
  return zip.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
}
