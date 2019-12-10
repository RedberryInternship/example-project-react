
type RegionFrom = {
  latitude : number,
  longitude : Number,
  latitudeDelta : Number,
  longitudeDelta : Number,
}

export function regionFrom(lat : number, lng : number, zoomLevel : number):RegionFrom {
  zoomLevel = zoomLevel / 2
  const circumference = 40075
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000
  const angularDistance = zoomLevel / circumference

  const latitudeDelta = zoomLevel / oneDegreeOfLatitudeInMeters
  const longitudeDelta = Math.abs(Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))
  return {
      latitude: lat,
      longitude: lng,
      latitudeDelta,
      longitudeDelta,
  }
}