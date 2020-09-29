import { useState } from 'react'
import { useAsyncStorage } from '@react-native-community/async-storage'
import Defaults from 'utils/defaults'
import { locale } from 'locale'
import { useTranslation } from 'react-i18next'

const configureLocale = () => {
  const [locale, setLocale] = useState<locale>('ka')
  const { i18n } = useTranslation()
  const {
    getItem: getLocaleStorage,
    setItem: setLocaleStorage,
  } = useAsyncStorage('locale')

  const readUserLocale = async (): Promise<void> => {
    let locale: locale = await getLocaleStorage()
    if (locale === null) {
      locale = 'ka'
      setLocaleStorage('ka')
    } else {
      i18n.changeLanguage(locale)
    }

    Defaults.locale = locale
    setLocale(locale)
  }

  return {
    readUserLocale,
    locale,
    setLocale,
  }
}

export default configureLocale
