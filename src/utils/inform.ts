import { Alert } from 'react-native'
import Defaults from 'utils/defaults'
import { EasyAlert } from 'types'
import i18next from 'i18next'
import {
  captureException,
  captureMessage,
} from '@sentry/react-native'

// eslint-disable-next-line no-underscore-dangle
declare const __DEV__: boolean

/**
 * Send logs remotely for debugging.
 */
export const remoteLogger = (data: any, type: 'Error' | 'Message' = 'Error') => {
  if (__DEV__) {
    console.groupCollapsed('Error')
    console.log(data)
    console.groupEnd()
  }

  switch (type) {
    case 'Error': return captureException(data)
    case 'Message': return captureMessage(data)
    default: captureException(data)
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
 * Display warning alert.
 */
export const DisplayDropdownWithWarning = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  Defaults.dropdown?.alertWithType(
    'warn',
    i18next.t(title ?? 'dropDownAlert.warning'),
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
