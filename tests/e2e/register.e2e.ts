import {
  element,
  waitFor,
  device,
  expect,
  by,
} from 'detox'
import {
  fetchUserOTP,
  removeUser,
  logout,
  delay,
} from './helpers';

beforeAll(async () => {
  await device.launchApp({
    delete: true,
    permissions: {
      location: 'always',
      notifications: 'YES',
    },
  });
});

/**
 * New user information.
 */
const userPhoneNumber = '500102030';
const userName = 'Ermalo';
const userSurname = 'Magradze';
const userMail = 'ermalio@mail.ru';
const password = 'chemioskari';

beforeEach(async () => {
  await removeUser(userPhoneNumber);
});

afterEach(async () => {
  await removeUser(userPhoneNumber);
})

it('Registers successfully', async () => {
  /**
   * Renders home screen,
   * navigating to registration
   * screen.
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(6000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('RegisterButton')).tap();

  /**
   * Input phone number and one-time-password.
   */
  await element(by.id('PhoneInput')).typeText(userPhoneNumber);
  await element(by.id('SendOTP')).tap();
  const userOTP = await fetchUserOTP(userPhoneNumber);
  await element(by.id('OneTimePasswordInput')).typeText(userOTP);
  await element(by.id('RegistrationNextButton')).tap();

  /**
   * Input user first name, last name and email.
   */
  await waitFor(element(by.id('RegistrationUserInfo'))).toBeVisible().withTimeout(2000);
  await element(by.id('FirstNameInput')).typeText(userName);
  await element(by.id('LastNameInput')).typeText(userSurname);
  await element(by.id('EmailInput')).typeText(userMail);
  await element(by.id('RegistrationNextButton')).tap();

  /**
   * Set password.
   */
  await element(by.id('RegistrationPasswordInput')).typeText(password);
  await element(by.id('RegistrationRepeatPasswordInput')).typeText(password);
  await element(by.id('AgreeTermsAndConditionsButton')).tap();
  await element(by.id('RegistrationNextButton')).tap();

  /**
   * Skip adding credit card.
   */
  await element(by.id('RegistrationSkipAddCardButton')).tap();

  /**
   * Close registration success modal.
   */
  await waitFor(element(by.id('RegistrationSuccessModalCloseButton')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('RegistrationSuccessModalCloseButton')).tap();

  /**
   * Close add car alert.
   */
  await delay(2);
  await element(by.label('არა')).atIndex(0).tap();
  await delay(2);
  await logout();
});

test('Registration flow has correct error messages', async () => {
  /**
   * Renders home screen,
   * navigating to registration
   * screen.
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(6000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('RegisterButton')).tap();

  /**
   * Assert phone number error message.
   */
  await element(by.id('RegistrationNextButton')).tap();
  await waitFor(element(by.text('გთხოვთ ჩაწეროთ ტელეფონის ნომერი')))
    .toBeVisible()
    .withTimeout(1000);

  /**
   * Assert otp error message.
   */
  await delay(1);
  await element(by.id('PhoneInput')).typeText(userPhoneNumber);
  await element(by.id('RegistrationNextButton')).tap();
  await waitFor(element(by.text('შეიყვანეთ sms კოდი')))
    .toBeVisible()
    .withTimeout(1000);

  /**
   * Type otp and go to next screen.
   */
  await delay(1);
  await element(by.id('SendOTP')).tap();
  const userOTP = await fetchUserOTP(userPhoneNumber);
  await element(by.id('OneTimePasswordInput')).typeText(userOTP);
  await element(by.id('RegistrationNextButton')).tap();

  /**
   * Assert user personal info error messages.
   */
  await waitFor(element(by.id('RegistrationUserInfo'))).toBeVisible().withTimeout(2000);
  await element(by.id('RegistrationNextButton')).tap();
  await expect(element(by.text('გთხოვთ ჩაწეროთ სახელი სწორი ფორმატით'))).toBeVisible();
  await expect(element(by.text('გთხოვთ ჩაწეროთ გვარი სწორი ფორმატით'))).toBeVisible();
  await element(by.id('EmailInput')).typeText('somthing');
  await expect(element(by.text('იმეილის ფორმატი არ არის სწორი'))).toBeVisible();

  /**
   * Input user first name, last name and email.
   */
  await element(by.id('FirstNameInput')).typeText(userName);
  await element(by.id('LastNameInput')).typeText(userSurname);
  await element(by.id('EmailInput')).clearText();
  await element(by.id('EmailInput')).typeText(userMail);
  await element(by.id('RegistrationNextButton')).tap();

  /**
   * Assert terms and conditions error message.
   */
  await delay(2);
  await element(by.id('RegistrationNextButton')).tap();
  await waitFor(element(by.text('გთხოვთ დაეთანხმოთ წესებს და პირობებს')))
    .toBeVisible()
    .withTimeout(1000);
  await element(by.id('AgreeTermsAndConditionsButton')).tap();

  /**
   * Assert password error message.
   */
  await delay(1);
  await element(by.id('RegistrationNextButton')).tap()
  await waitFor(element(by.text('გთხოვთ, შეავსოთ პაროლის ველები')))
    .toBeVisible()
    .withTimeout(1000);

  /**
   * Set password.
   */
  await delay(5);
  await element(by.id('RegistrationPasswordInput')).clearText();
  await element(by.id('RegistrationPasswordInput')).typeText(password);
  await element(by.id('RegistrationRepeatPasswordInput')).typeText(password);
  await element(by.id('RegistrationNextButton')).tap();

  /**
   * Skip adding credit card.
   */
  await element(by.id('RegistrationSkipAddCardButton')).tap();

  /**
   * Close registration success modal.
   */
  await waitFor(element(by.id('RegistrationSuccessModalCloseButton')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('RegistrationSuccessModalCloseButton')).tap();

  /**
   * Close add car alert.
   */
  await delay(2);
  await element(by.label('არა')).atIndex(0).tap();
  await delay(2);
  await logout();
});
