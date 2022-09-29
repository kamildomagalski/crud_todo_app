export function stripToMinutes(date) {
  return date.toString().slice(0, 16).split("T").join(" ");
}
