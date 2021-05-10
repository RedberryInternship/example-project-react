import {
  element,
  waitFor,
  device,
  expect,
  by,
} from 'detox';
import { delay, resetUserData } from './helpers'

const testUserPhone = '500102031';
const testUserPassword = 'detoxify';

beforeAll(async () => {
  await resetUserData(testUserPhone);

  /**
   * Launch the app.
   */
  await device.launchApp({
    delete: true,
    permissions: {
      location: 'always',
      notifications: 'YES',
    },
  });

  /**
   * Log into the application.
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await element(by.id('PasswordInput')).tap();
  await element(by.id('PasswordInput')).typeText(testUserPassword);
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.id('TermsAndConditions'))).toBeVisible().withTimeout(3000);
  await element(by.id('AcceptTermsButton')).tap();
});

afterAll(async () => {
  await resetUserData(testUserPhone);
});

beforeEach(async () => {
  await device.reloadReactNative();
});

it('Change firstname', async () => {
  await delay(3);
  await element(by.id('DrawerButton')).tap();
  await element(by.id('SettingsButton')).tap();
  await element(by.id('firstnameButton')).tap();
  await element(by.id('firstnameInput')).clearText();
  await element(by.id('firstnameInput')).typeText('გელა');
  await element(by.id('SaveButton')).tap();
  await expect(element(by.text('გელა'))).toBeVisible();
});

it('Change lastname', async () => {
  await delay(3);
  await element(by.id('DrawerButton')).tap();
  await element(by.id('SettingsButton')).tap();
  await element(by.id('lastnameButton')).tap();
  await element(by.id('lastnameInput')).clearText();
  await element(by.id('lastnameInput')).typeText('აბდულაური');
  await element(by.id('SaveButton')).tap();
  await expect(element(by.text('აბდულაური'))).toBeVisible();
});

it('Change email', async () => {
  await delay(3);
  await element(by.id('DrawerButton')).tap();
  await element(by.id('SettingsButton')).tap();
  await element(by.id('mailButton')).tap();
  await element(by.id('emailInput')).clearText();
  await element(by.id('emailInput')).typeText('aslanabashidze@mail.ru');
  await element(by.id('SaveButton')).tap();
  await expect(element(by.text('aslanabashidze@mail.ru'))).toBeVisible();
});

it('Change password', async () => {
  await delay(3);
  await element(by.id('DrawerButton')).tap();
  await element(by.id('SettingsButton')).tap();
  await element(by.id('passwordButton')).tap();

  await element(by.id('currentPassword')).typeText(testUserPassword)
  await element(by.id('PasswordInput')).typeText('atasertigame');
  await element(by.id('RepeatPasswordInput')).typeText('atasertigame');

  await element(by.id('SaveButton')).tap();
});
