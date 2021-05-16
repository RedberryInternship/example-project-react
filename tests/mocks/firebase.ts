/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

const firebaseMessaging = jest.fn()
const firebaseApp = jest.fn();
export {
  firebaseApp,
  firebaseMessaging,
};

jest.mock('@react-native-firebase/messaging', () => firebaseMessaging)
jest.mock('@react-native-firebase/app', () => firebaseApp);
