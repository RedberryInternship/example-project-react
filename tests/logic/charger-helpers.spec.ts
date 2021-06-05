import { addDistanceField, haveLocalChargersExpired } from '../../src/helpers/chargers'
import defaults from 'utils/defaults'
import charger from '../factory/charger'

test('Add distance to field to charger', () => {
  defaults.location = {
    lat: 0,
    lng: 0,
  };

  charger.lng = '3';
  charger.lat = '4';

  charger.distance = 0;

  const newCharger = addDistanceField(charger);

  expect(newCharger.distance).toBe(5);
});

test('Cached chargers are not yet expired', () => {
  defaults.chargers = {
    time: new Date().getTime(),
    data: [],
  }

  const expired = haveLocalChargersExpired();

  expect(expired).toBe(false);
});

test('Cached chargers expired', () => {
  const date = new Date();
  date.setFullYear(2000);

  defaults.chargers = {
    time: date.getTime(),
    data: [],
  }

  const expired = haveLocalChargersExpired();

  expect(expired).toBe(true);
});
