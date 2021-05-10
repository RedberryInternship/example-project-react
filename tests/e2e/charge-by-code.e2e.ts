import {
  waitFor,
  element,
  device,
  expect,
  by,
} from 'detox';
import { delay } from './helpers'

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
});

it('Goes into charge by code screen flow without authentication', async () => {
  /**
   * Trying to search charger by code without
   * authorization, which should gives us warning
   * to first authorize.
   */
  await delay(3);
  await element(by.id('ChargeWithCode')).tap();
  await waitFor(element(by.text('დამუხტვის დასაწყებად, გაიარეთ ავტორიზაცია')))
    .toBeVisible()
    .withTimeout(1000);
});

it('Goes charge by code screen flow with authentication', async () => {
  await device.reloadReactNative();

  /**
   * Authorize..
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await element(by.id('PasswordInput')).tap();
  await element(by.id('PasswordInput')).typeText(testUserPassword);
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.id('TermsAndConditions'))).toBeVisible().withTimeout(3000);
  await element(by.id('AcceptTermsButton')).tap();

  /**
   * Search for 0028 charger.
   */
  await element(by.id('ChargeWithCode')).tap();
  await element(by.id('ChargeWithCodeInput')).typeText('0028');
  await element(by.id('next')).tap();

  /**
   * Confirm that it's the right type of charger.
   */
  await expect(element(by.text('Type 2'))).toBeVisible();
});

it('Cannot find charger', async () => {
  await device.reloadReactNative();
  await delay(2);

  /**
   * Try to search non-existing charger which should
   * give us error message.
   */
  await element(by.id('ChargeWithCode')).tap();
  await element(by.id('ChargeWithCodeInput')).typeText('11211');
  await element(by.id('next')).tap();

  await waitFor(element(by.text('ასეთი კოდით დამტენი არ მოიძებნა')))
    .toBeVisible()
    .withTimeout(1000);
});
