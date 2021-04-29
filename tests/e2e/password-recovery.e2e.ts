import {
  element,
  waitFor,
  device,
  expect,
  by,
} from 'detox'
import { fetchUserOTP, resetUserPassword, delay } from './helpers'

const testUserPhone = '500102031';
const testUserForgottenPassword = 'detoxify';
const testUserNewPassword = 'capitan-marvel';

beforeEach(async () => {
  await device.launchApp({
    delete: true,
    permissions: {
      notifications: 'YES',
      location: 'always',
    },
  });
});

test('Forgot password functionality is - ok', async () => {
  /**
   * Log into app.
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('ForgotPasswordButton')).tap();

  /**
   * Type phone number and get one time password.
   */
  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await element(by.id('SendOTP')).tap();
  const userOTP = await fetchUserOTP(testUserPhone);
  await element(by.id('OneTimePasswordInput')).typeText(userOTP);
  await element(by.id('ForgotPasswordNextButton')).tap();

  /**
   * Type new password and recover.
   */
  await element(by.id('PasswordInput')).typeText(testUserNewPassword);
  await element(by.id('RepeatPasswordInput')).typeText(testUserNewPassword);
  await element(by.id('ForgotPasswordNextButton')).tap();
  await expect(element(by.label('პაროლი წარმატებით შეიცვალა'))).toBeVisible();
  await resetUserPassword(testUserPhone, testUserForgottenPassword);
});

test('Forgot password flow has correct error messages', async () => {
  /**
   * Log into app.
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('ForgotPasswordButton')).tap();

  /**
  * Assert phone number error message.
  */
  await element(by.id('ForgotPasswordNextButton')).tap();
  await waitFor(element(by.text('გთხოვთ ჩაწეროთ ტელეფონის ნომერი')))
    .toBeVisible()
    .withTimeout(1000);

  /**
   * Assert otp error message.
   */
  await delay(1);
  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await element(by.id('ForgotPasswordNextButton')).tap();
  await waitFor(element(by.text('შეიყვანეთ sms კოდი')))
    .toBeVisible()
    .withTimeout(1000);

  /**
   * Get one time password and go to next screen.
   */
  await element(by.id('SendOTP')).tap();
  const userOTP = await fetchUserOTP(testUserPhone);
  await element(by.id('OneTimePasswordInput')).typeText(userOTP);
  await element(by.id('ForgotPasswordNextButton')).tap();

  /**
  * Assert password error message.
  */
  await delay(1);
  await element(by.id('ForgotPasswordNextButton')).tap()
  await waitFor(element(by.text('გთხოვთ, შეავსოთ პაროლის ველები')))
    .toBeVisible()
    .withTimeout(1000);

  /**
   * Type new password and recover.
   */
  await element(by.id('PasswordInput')).typeText(testUserNewPassword);
  await element(by.id('RepeatPasswordInput')).typeText(testUserNewPassword);
  await element(by.id('ForgotPasswordNextButton')).tap();
  await expect(element(by.label('პაროლი წარმატებით შეიცვალა'))).toBeVisible();
  await resetUserPassword(testUserPhone, testUserForgottenPassword);
});
