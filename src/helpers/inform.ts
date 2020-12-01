import { Alert } from 'react-native'
import Defaults from 'utils/defaults'
import { EasyAlert } from 'allTypes.d'
import i18next from 'i18next'
import Sentry from 'utils/sentry'

/**
 * Log data when in development mode.
 *
 * @param data
 */
export const Logger = (data: any): void => {
  if (__DEV__) {
    console.log(data)
  }
}

/**
 * Send logs remotely for debugging.
 */
export const remoteLogger = (data: any, type: 'Error' | 'Message' = 'Error') => {
  if (__DEV__) {
    console.log([`RemoteLogger - ${type}`, data])
  }

  switch (type) {
    case 'Error':
      return Sentry.captureException(data)
    case 'Message':
      return Sentry.captureMessage(data)
    default:
      Sentry.captureException(data)
  }
}

/**
 * Display error alert.
 */
export const DisplayDropdownWithError = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  const args = ['error', i18next.t(title ?? 'dropDownAlert.generalError')]

  text && args.push(i18next.t(text))
  Defaults.dropdown?.alertWithType(...args)
}

/**
 * Display success alert.
 */
export const DisplayDropdownWithSuccess = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  Defaults.dropdown?.alertWithType(
    'success',
    i18next.t(title ?? 'dropDownAlert.generalSuccess'),
    i18next.t(text ?? ''),
  )
}

/**
 * Display highly configurable alert.
 */
export const easyAlert = (config: EasyAlert) => {
  const {
    onRightClick,
    onLeftClick,
    rightText,
    leftText,
    title,
    text,
  } = config

  Alert.alert(
    i18next.t(title ?? ''),
    i18next.t(text ?? ''),
    [
      {
        text: i18next.t(leftText ?? ''),
        onPress: onLeftClick,
      },
      {
        text: i18next.t(rightText ?? 'no'),
        onPress: onRightClick,
        style: 'destructive',
      },
    ],
    { cancelable: true },
  )
}
