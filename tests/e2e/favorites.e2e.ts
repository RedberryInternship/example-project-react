import {
  element,
  waitFor,
  device,
  by,
} from 'detox';
import { delay, clearFavorites } from './helpers'

const testUserPhone = '500102031';
const testUserPassword = 'detoxify';

beforeAll(async () => {
  await clearFavorites(testUserPhone);
});

beforeEach(async () => {
  await device.launchApp({
    delete: true,
    permissions: {
      location: 'always',
      notifications: 'YES',
    },
  });

  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await delay(1);
  await element(by.id('PasswordInput')).tap();
  await element(by.id('PasswordInput')).typeText(testUserPassword);
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.id('TermsAndConditions'))).toBeVisible().withTimeout(3000);
  await element(by.id('AcceptTermsButton')).tap();

  await device.reloadReactNative();
});

it('Adds charger into favorites', async () => {
  await delay(2);
  await element(by.id('ChargeWithCode')).tap();
  await element(by.id('ChargeWithCodeInput')).typeText('0028');
  await element(by.id('next')).tap();
  await element(by.id('AddToFavoritesButton')).tap();
  await waitFor(element(by.text('დამტენი წარმატებით დაემატა')))
    .toBeVisible()
    .withTimeout(1000);
});

it('Removes charger from favorites', async () => {
  await device.reloadReactNative();
  await delay(2);
  await element(by.id('FavoriteChargers')).tap();
  await delay(1);
  await element(by.id('RemoveFavoriteChargerButton')).tap();
  await waitFor(element(by.text('დამტენი წარმატებით წაიშალა')))
    .toBeVisible()
    .withTimeout(1000);
});
