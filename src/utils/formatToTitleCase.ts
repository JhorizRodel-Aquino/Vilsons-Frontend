export default function formatToTitleCase(text: string): string {
  return text
    .replace(/([A-Z])/g, " $1") // insert space before capital letters
    .replace(/^./, (char) => char.toUpperCase()) // capitalize the first letter
    .trim();
}