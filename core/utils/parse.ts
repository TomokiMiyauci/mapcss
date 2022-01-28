export function parseNumeric(value: string): number | undefined {
  const number = Number(value);
  if (Number.isNaN(number)) return;
  return number;
}
