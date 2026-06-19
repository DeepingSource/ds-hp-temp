export function toSlug(text: string): string {
  return text
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
