import { Alert } from 'react-native'
import Defaults from 'utils/defaults'
import { EasyAlert } from 'allTypes.d'
import i18next from 'i18next'

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
 * Display error alert.
 *
 * @param title
 * @param text
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
 *
 * @param title
 * @param text
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
 *
 * @param {string} title
 * @param {string} text
 * @param {string} rightText
 * @param {string} leftText
 * @param {Function} onRightClick
 * @param {Function} onLeftClick
 */
export const easyAlert = ({
  title,
  text,
  rightText,
  leftText,
  onRightClick,
  onLeftClick,
}: EasyAlert) => {
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
