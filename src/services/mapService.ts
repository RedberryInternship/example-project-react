/* eslint-disable @typescript-eslint/camelcase */
import { MAP_URL, locationIfNoGPS, MAP_API } from 'utils/const';
import mergeCoords from 'utils/mapAndLocation/mergeCoords'
import i18next from 'i18next';
import axios from 'axios';
import ajax from './ajax';
import { getCoordsByIPResponseType } from 'allTypes';

export const getDistance = (
  originLat: number,
  originLng: number,
  destinationLat: string,
  destinationLng: string,
): Promise<any> =>
  axios.get(`${MAP_URL}/distancematrix/json?origins=${mergeCoords(
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
): Promise<any> =>
  axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${mergeCoords(
      originLat ?? locationIfNoGPS.lat,
      originLng ?? locationIfNoGPS.lng,
    )}&destination=${mergeCoords(
      destinationLat,
      destinationLng,
    )}&mode=driving&key=${MAP_API}`,
  );

export const getCoordsByIP = (): Promise<getCoordsByIPResponseType> =>
  ajax.get('/geo-ip');
