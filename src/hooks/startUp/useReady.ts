import { useState, useEffect } from 'react'
import NavigationActions from 'utils/navigation.service'
import { locale } from 'locale'

type Ready = {
  navigationState: boolean
  locale: locale
  token: string | null
}

const useReady = ({ navigationState, locale, token }: Ready) => {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    if (navigationState && locale !== '' && token != '') {
      setAppReady(true)
      onReady()
    } else setAppReady(false)
  }, [token, navigationState, locale])

  const onReady = (): void => {
    NavigationActions.navigate('MainDrawer')
  }

  return {
    appReady,
  }
}

export default useReady
