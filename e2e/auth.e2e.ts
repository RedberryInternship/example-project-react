/* eslint-disable import/no-extraneous-dependencies */
import {
  element,
  waitFor,
  device,
  by,
} from 'detox'

beforeEach(async () => {
  await device.uninstallApp();
  await device.installApp();
  await device.launchApp({
    permissions: {
      location: 'always',
      notifications: 'YES',
    },
  });
});

it('Authenticates without any problems', async () => {
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('PhoneInput')).typeText('591935080');
  await element(by.id('PasswordInput')).typeText('datvidatvi');
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.id('TermsAndConditions'))).toBeVisible().withTimeout(3000);
  await element(by.id('AcceptTermsButton')).tap();
});

it('Has error alerts when not typing into the inputs', async () => {
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.text('გთხოვთ ჩაწეროთ ტელეფონის ნომერი')))
    .toBeVisible()
    .withTimeout(2000);
});
