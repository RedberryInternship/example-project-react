import moment from 'moment';
import  SunCalc from 'suncalc';
type RegionFrom = {
  latitude : number,
  longitude : number,
  latitudeDelta : number,
  longitudeDelta : number,
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


export function determineTimePeriod() {
  var times = SunCalc.getTimes(new Date(),41.716667, 44.783333);

  return moment(moment()).isBetween(times.sunrise,times.sunset ) 
}


export const mergeCoords = (lat : number | string , lng: number | string) : string => {

  return lat + ',' + lng
}