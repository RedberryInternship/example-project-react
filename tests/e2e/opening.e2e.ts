/* eslint-disable import/no-extraneous-dependencies */
import {
  element,
  device,
  expect,
  by,

} from 'detox'

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have opening screen', async () => {
    await expect(element(by.id('title'))).toBeVisible();
    await expect(element(by.text('Welcome to E-Space'))).toBeVisible();
  });
});
