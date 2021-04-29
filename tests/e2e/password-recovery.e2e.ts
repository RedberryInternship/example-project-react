import {
  element,
  waitFor,
  device,
  expect,
  by,
} from 'detox'
import { fetchUserOTP, resetUserPassword } from './helpers'

const testUserPhone = '500102031';
const testUserForgottenPassword = 'detoxify';
const testUserNewPassword = 'capitan-marvel';

beforeAll(async () => {
  await device.launchApp({
    delete: true,
    permissions: {
      notifications: 'YES',
      location: 'always',
    },
  });
});

test('Forgot password functionality is - ok', async () => {
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('ForgotPasswordButton')).tap();

  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await element(by.id('SendOTP')).tap();
  const userOTP = await fetchUserOTP(testUserPhone);
  await element(by.id('OneTimePasswordInput')).typeText(userOTP);
  await element(by.id('ForgotPasswordNextButton')).tap();

  await element(by.id('PasswordInput')).typeText(testUserNewPassword);
  await element(by.id('RepeatPasswordInput')).typeText(testUserNewPassword);
  await element(by.id('ForgotPasswordNextButton')).tap();
  await expect(element(by.label('პაროლი წარმატებით შეიცვალა'))).toBeVisible();
  await resetUserPassword(testUserPhone, testUserForgottenPassword);
});
