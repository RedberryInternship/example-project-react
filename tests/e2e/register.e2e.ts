import {
  element,
  waitFor,
  device,
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

beforeEach(async () => {
  await removeUser('500102030');
});

afterEach(async () => {
  await removeUser('500102030');
})

it('Registers successfully', async () => {
  /**
   * New user information.
   */
  const userPhoneNumber = '500102030';
  const userName = 'Ermalo';
  const userSurname = 'Magradze';
  const userMail = 'ermalio@mail.ru';
  const password = 'chemioskari';

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
