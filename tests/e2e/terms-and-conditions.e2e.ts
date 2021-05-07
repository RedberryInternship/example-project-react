import {
  device,
  expect,
  element,
  by,
  waitFor,
} from 'detox'

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

it('Should show terms and conditions pop-up after authorization', async () => {
  /**
   * On login user should agree terms and conditions.
   * and if not he / she can't use the application.
   */
  await waitFor(element(by.id('AuthButton'))).toBeVisible().withTimeout(5000);
  await element(by.id('AuthButton')).tap();
  await element(by.id('PhoneInput')).typeText(testUserPhone);
  await element(by.id('PasswordInput')).typeText(testUserPassword);
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.id('TermsAndConditions'))).toBeVisible().withTimeout(3000);
  await element(by.id('AcceptTermsButton')).tap();
});

test('User can see terms and conditions after authorization', async () => {
  /**
   * User must be able to see terms and
   * conditions after he has agreed to it.
   */
  await element(by.id('DrawerButton')).tap();
  await element(by.id('termsAndConditionsButton')).tap();
  await expect(element(by.id('TermsAndConditions'))).toBeVisible();
  await element(by.id('closeTermsAndConditionsModalButton')).tap();
  await expect(element(by.id('TermsAndConditions'))).not.toBeVisible();
});
