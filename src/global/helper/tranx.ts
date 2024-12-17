export function generateReference(): string {
  return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
