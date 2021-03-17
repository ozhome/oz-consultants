export default function (date: Date): string {
  const day = new Date(date);
  return `${day.getDay()}/${day.getMonth()}/${day.getFullYear()}`;
}
