export function formatDate(date: any) {
  if (!date) return null;
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}