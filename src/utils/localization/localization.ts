import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { LocaleStringObject } from 'types'
import en from './en'
import ka from './ka'

// eslint-disable-next-line no-underscore-dangle
declare const __DEV__: boolean

i18n.use(initReactI18next)
  .init(
    {
      fallbackLng: 'ka',
      debug: __DEV__,
      lng: 'ka',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en,
        ka,
      },
    },
  )

export default i18n

export const getLocaleText = (
  stringObj: LocaleStringObject,
): string => (stringObj ? stringObj[i18n.language] ?? '' : '')
