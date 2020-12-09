import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import defaults from 'utils/defaults'
import { Locale } from 'allTypes'
import { getLocale } from 'helpers/locale'

/**
 * Retrieve locale from storage
 * and configure i18n translator.
 */
const configureLocale = async () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    (async () => {
      const locale: Locale = await getLocale()
      locale && i18n.changeLanguage(locale)
      defaults.locale = locale
    })()
  }, [])
}

export default configureLocale
