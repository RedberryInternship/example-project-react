import { device, element, by } from 'detox'

export const logout = async () => {
  await element(by.id('DrawerButton')).tap();
  await element(by.id('LogoutButton')).tap();
  await element(by.text('გამოსვლა')).atIndex(0).tap();
  device.reloadReactNative();
}

export const delay = async (second: number) => setTimeout(() => { }, second * 1000);
