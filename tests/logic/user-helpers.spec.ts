import { getUserTokenFromStorage, isAuthenticated } from 'helpers/user'
import defaults from 'utils/defaults'
import mockAsyncStorage from '../mocks/async-storage'
// import { log } from 'console'

test('Get token from async storage', async () => {
  mockAsyncStorage.getItem.mockResolvedValue('auth-token');
  const token = await getUserTokenFromStorage();
  expect(token).toBe('auth-token');
});

describe('User defaults token', () => {
  test('Determine if user is authenticated - success', () => {
    defaults.token = 'some-token';
    const isAuth = isAuthenticated();
    expect(isAuth).toBe(true);
  });

  test('Determine if user is authenticated - false', () => {
    defaults.token = null;
    const isAuth = isAuthenticated();
    expect(isAuth).toBe(false);
  })
});
