import {
  element,
  device,
  expect,
  by,

} from 'detox'

beforeAll(async () => {
  await device.launchApp();
  await device.reloadReactNative();
});

it('should have opening screen', async () => {
  await expect(element(by.id('title'))).toBeVisible();
  await expect(element(by.text('Welcome to E-Space'))).toBeVisible();
});
