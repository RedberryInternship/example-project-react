import {
  element,
  waitFor,
  device,
  by,
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

it('Can filter by charger code', async () => {
  await element(by.id('homeTopSearchButton')).tap();
  await element(by.id('homeTopSearchButton')).typeText('0028');
  await element(by.text('დამტენი 0028')).atIndex(0).tap();
  await waitFor(element(by.id('Pin - 0028'))).toExist().withTimeout(1000);
});

it('Can filter by charger description', async () => {
  await element(by.id('homeTopSearchButton')).tap();
  await element(by.id('homeTopSearchButton')).clearText();
  await element(by.id('homeTopSearchButton')).typeText('თავისუფალი უნი');
  await element(by.text('დამტენი 0028')).atIndex(0).tap();
  await waitFor(element(by.id('Pin - 0028'))).toExist().withTimeout(1000);
});

it('Can filter by other languages', async () => {
  await element(by.id('homeTopSearchButton')).tap();
  await element(by.id('homeTopSearchButton')).clearText();
  await element(by.id('homeTopSearchButton')).typeText('Зарядное Устройство 0028');
  await element(by.text('დამტენი 0028')).atIndex(0).tap();
  await waitFor(element(by.id('Pin - 0028'))).toExist().withTimeout(1000);
});
