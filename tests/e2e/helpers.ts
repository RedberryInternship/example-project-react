/* eslint-disable no-empty */
/* eslint-disable max-len */
import { device, element, by } from 'detox'
import axios from 'axios'

export const logout = async () => {
  await element(by.id('DrawerButton')).tap();
  await element(by.id('LogoutButton')).tap();
  await element(by.text('გამოსვლა')).atIndex(0).tap();
  device.reloadReactNative();
}

export const delay = async (second: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, second * 1000);
});

export const fetchUserOTP = async (phoneNumber: string) => {
  try {
    const { data } = await axios.get('https://api-dev.e-space.ge/e2e/user/otp', {
      params: {
        phone_number: `+995${phoneNumber}`,
      },
    })

    const { code } = data;

    return code;
  } catch (e) {
    throw new Error('Something went wrong with connecting server...');
  }
}

export const resetUserPassword = async (phoneNumber: string, previousPassword: string) => {
  try {
    await axios.patch('https://api-dev.e-space.ge/e2e/user/reset-password', {
      phone_number: `+995${phoneNumber}`,
      previous_password: previousPassword,
    })
  } catch (e) {
    throw new Error('Something went wrong with connecting server...');
  }
}

export const removeUser = async (phoneNumber: string) => {
  try {
    await axios.delete('https://api-dev.e-space.ge/e2e/user', {
      data: {
        phone_number: `+995${phoneNumber}`,
      },
    })
  } catch (e) {
    throw new Error('Something went wrong with connecting server...');
  }
}

export const clearFavorites = async (phoneNumber: string) => {
  try {
    await axios.delete('https://api-dev.e-space.ge/e2e/user/clear-favorites', {
      data: {
        phone_number: `+995${phoneNumber}`,
      },
    })
  } catch (e) {
    throw new Error('Something went wrong with connecting server...');
  }
}

export const clearCars = async (phoneNumber: string) => {
  try {
    await axios.delete('https://api-dev.e-space.ge/e2e/user/clear-cars', {
      data: {
        phone_number: `+995${phoneNumber}`,
      },
    })
  } catch (e) {
    throw new Error('Something went wrong with connecting server...');
  }
}
