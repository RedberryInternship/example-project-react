/**
 * Format credit card digits.
 */
export const formatCreditCardDigits = (maskedPan: string) => {
  const octetsArray = [];

  for (let i = 0; i < maskedPan.length; i += 4) {
    octetsArray.push(maskedPan.slice(i, i + 4))
  }

  return octetsArray.join(' ')
}
