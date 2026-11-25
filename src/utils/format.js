export function formatPrice(price, rent = false) {
  if (rent) return `£${price.toLocaleString()} pcm`;
  return `£${price.toLocaleString()}`;
}
