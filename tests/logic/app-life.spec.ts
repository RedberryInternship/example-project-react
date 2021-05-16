import {
  isAppInBackground,
  isAppInForeground,
  setAppInBackground,
  setAppInForeground,
} from 'utils/app'
import defaults from 'utils/defaults'

test('Determine if app is in foreground works properly', () => {
  defaults.isForeground = true;

  const appIsInForeground = isAppInForeground();
  expect(appIsInForeground).toBe(true);
});

test('Determine if app is in background works properly', () => {
  defaults.isForeground = false;

  const appIsInBackground = isAppInBackground();
  expect(appIsInBackground).toBe(true);
});

test('Set app in foreground works properly', () => {
  setAppInForeground();

  const appIsInForeground = isAppInForeground();
  expect(appIsInForeground).toBe(true);
})

test('Set app in background works properly', () => {
  setAppInBackground();

  const appIsInBackground = isAppInBackground();
  expect(appIsInBackground).toBe(true);
})
