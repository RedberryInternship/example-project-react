/**
 * Determine pin image.
 */
export const determineChargerPin = (isPrivate: boolean, isFast: boolean, status?: number) => {
  const chargerType = isFast ? 'fast' : 'lvl2'
  const privacy = isPrivate ? 'Private' : 'Public';
  const chargerStatus = status !== undefined
    ? [
      'Free',
      'Charging',
      'NotWorking',
    ][status]
    : ''

  return chargerType + privacy + chargerStatus
}
