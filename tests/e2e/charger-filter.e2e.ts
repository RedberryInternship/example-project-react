import {
  element,
  waitFor,
  device,
  by,
  expect,
} from 'detox'
import { delay } from './helpers';

const testUserPhone = '500102031';
const testUserPassword = 'detoxify';

beforeAll(async () => {
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
});

it('Filters by fast charger', async () => {
  await element(by.id('BottomFilterHeader')).swipe('up', 'slow');
  await element(by.text('სწრაფი')).atIndex(0).tap();
  await element(by.text('დამტენი 0065')).atIndex(0).tap();
  await expect(element(by.text('Combo 2'))).toBeVisible();
});

it('Filters by free charger', async () => {
  await device.reloadReactNative();
  await delay(2);
  await element(by.id('BottomFilterHeader')).swipe('up', 'slow');
  await element(by.text('თავისუფალი')).atIndex(0).tap();
  await element(by.text('დამტენი 0001')).atIndex(0).tap();
});

it('Filters by lvl 2 charger', async () => {
  await device.reloadReactNative();
  await delay(2);
  await element(by.id('BottomFilterHeader')).swipe('up', 'slow');
  await element(by.text('მე-2-ე დონის')).atIndex(0).tap();
  await element(by.text('დამტენი 0039')).atIndex(0).tap();
  await expect(element(by.text('Type 2'))).toBeVisible();
});

it('Filters by charger code', async () => {
  await device.reloadReactNative();
  await delay(2);
  await element(by.id('BottomFilterHeader')).swipe('up', 'slow');
  await element(by.id('SearchChargerInput')).typeText('0028');
  await expect(element(by.text('დამტენი 0028'))).toBeVisible();
});
