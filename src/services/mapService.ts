import { MAP_URL, locationIfNoGPS, MAP_API } from 'utils/const';
import { mergeCoords } from 'utils/map'
import i18next from 'i18next';
import { getCoordsByIPResponseType } from 'types';
import Axios from 'axios'
import customAxios from './axios'

export const getDistance = (
  originLat: number,
  originLng: number,
  destinationLat: string,
  destinationLng: string,
): Promise<any> => Axios.get(`${MAP_URL}/distancematrix/json?origins=${mergeCoords(
  originLat ?? locationIfNoGPS.lat,
  originLng ?? locationIfNoGPS.lng,
)}
  &destinations=${mergeCoords(
  destinationLat ?? locationIfNoGPS.lat,
  destinationLng ?? locationIfNoGPS.lng,
)}
  &mode=driving&units=metric&language=${i18next.language}&key=${MAP_API}`);

export const getDirection = (
  originLat: number,
  originLng: number,
  destinationLat: number,
  destinationLng: number,
): Promise<any> => Axios.get(
  `https://maps.googleapis.com/maps/api/directions/json?origin=${mergeCoords(
    originLat ?? locationIfNoGPS.lat,
    originLng ?? locationIfNoGPS.lng,
  )}&destination=${mergeCoords(
    destinationLat,
    destinationLng,
  )}&mode=driving&key=${MAP_API}`,
);

export const getCoordsByIP = (): Promise<getCoordsByIPResponseType> => customAxios.get('/geo-ip');
