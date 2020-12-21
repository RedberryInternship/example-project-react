import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { LocaleStringObject } from 'types'
import en from './en'
import ka from './ka'

i18n.use(initReactI18next)
  .init(
    {
      fallbackLng: 'ka',
      debug: false,
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
