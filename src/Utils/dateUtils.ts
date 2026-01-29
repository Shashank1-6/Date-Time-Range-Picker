export function combineDateAndTime(
  year: number,
  month: number,
  day: number,
  time: string
) {
  const [hours, minutes] = time.split(":").map(Number)
  return new Date(year, month, day, hours, minutes)
}
