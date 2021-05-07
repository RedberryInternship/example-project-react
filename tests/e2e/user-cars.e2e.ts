import {
  waitFor,
  element,
  device,
  expect,
  by,
} from 'detox'
import { clearCars, delay } from './helpers'

const testUserPhone = '500102031';
const testUserPassword = 'detoxify';

beforeAll(async () => {
  /**
   * Remove all the user cars.
   */
  await clearCars(testUserPhone);

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
  await element(by.id('PasswordInput')).typeText(testUserPassword);
  await element(by.id('AuthButton')).tap();
  await waitFor(element(by.id('TermsAndConditions'))).toBeVisible().withTimeout(3000);
  await element(by.id('AcceptTermsButton')).tap();
});

it('Adds new car', async () => {
  /**
   * Log into parameters.
   */
  await element(by.id('DrawerButton')).tap();
  await element(by.id('SettingsButton')).tap();

  /**
   * Go into user cars screen and add BMW i3 car.
   */
  await element(by.id('addCarButton')).tap();
  await element(by.id('manufacturerSelect')).tap();
  await element(by.text('BMW')).tap();
  await element(by.id('modelSelect')).tap();
  await element(by.text('i3')).tap();
  await element(by.id('SaveButton')).tap();
  await expect(element(by.text('ინფორმაცია წარმატებით განახლდა'))).toBeVisible();
  await waitFor(element(by.text('პარამეტრები'))).toBeVisible().withTimeout(5000);

  /**
   * Return to user cars screen and confirm that
   * new car has been added.
   */
  await element(by.id('addCarButton')).tap();
  await expect(element(by.text('BMW'))).toBeVisible();

  /**
   * Add another car - Audi e-tron.
   */
  await element(by.id('manufacturerSelect')).tap();
  await element(by.text('BYD')).tap();
  await element(by.id('modelSelect')).tap();
  await element(by.text('e6')).tap();
  await element(by.id('SaveButton')).tap();
  await expect(element(by.text('ინფორმაცია წარმატებით განახლდა'))).toBeVisible();
  await waitFor(element(by.text('პარამეტრები'))).toBeVisible().withTimeout(5000);

  /**
   * Return to user cars screen and confirm that
   * another car has been added.
   */
  await element(by.id('addCarButton')).tap();
  await expect(element(by.text('BYD'))).toBeVisible();
});

it('Removes added cars', async () => {
  await device.reloadReactNative();
  await delay(3);

  /**
   * Go to user cars screen.
   */
  await element(by.id('DrawerButton')).tap();
  await element(by.id('SettingsButton')).tap();
  await element(by.id('addCarButton')).tap();

  /**
   * Delete first added car - BMW.
   */
  await element(by.id('deleteBMWButton')).tap();
  await element(by.text('დიახ')).atIndex(0).tap();

  /**
   * Delete another added car - BYD.
   */
  await element(by.id('deleteBYDButton')).tap();
  await element(by.text('დიახ')).atIndex(0).tap();

  /**
   * Confirm that those cars aren't visible anymore.
   */
  await expect(element(by.text('BMW'))).not.toBeVisible();
  await expect(element(by.text('BYD'))).not.toBeVisible();
});
