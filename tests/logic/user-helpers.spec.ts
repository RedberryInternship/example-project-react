import {
  getUserTokenFromStorage,
  saveJWTTokenAndUserData,
  isAuthenticated,
  clearUserData,
} from 'helpers/user'
import userDetails from '../factory/userDetail'
import defaults from 'utils/defaults'
import mockAsyncStorage from '../mocks/async-storage'

test('Get token from async storage', async () => {
  mockAsyncStorage.getItem.mockResolvedValue('auth-token');
  const token = await getUserTokenFromStorage();
  expect(token).toBe('auth-token');
});

test('Determine if user is authenticated - success', () => {
  defaults.token = 'some-token';
  const isAuth = isAuthenticated();
  expect(isAuth).toBe(true);
});

test('Determine if user is authenticated - false', () => {
  defaults.token = null;
  const isAuth = isAuthenticated();
  expect(isAuth).toBe(false);
});

test('JWT token and userDetails is saved in async storage and in defaults object', () => {
  saveJWTTokenAndUserData(userDetails, 'some-token');

  expect(mockAsyncStorage.setItem.mock.calls[0][0]).toBe('token');
  expect(mockAsyncStorage.setItem.mock.calls[0][1]).toBe('some-token');

  expect(mockAsyncStorage.setItem.mock.calls[1][0]).toBe('userDetail');
  expect(mockAsyncStorage.setItem.mock.calls[1][1]).toBe(JSON.stringify(userDetails));
});

test('clear user data removes personal information', () => {
  clearUserData();

  expect(mockAsyncStorage.clear.mock.calls.length).toBe(1);
  expect(defaults.token).toBe('');
  expect(defaults.userDetail).toBeNull();
});
