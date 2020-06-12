/* eslint-disable @typescript-eslint/camelcase */
import React, {useCallback, useState, useEffect} from 'react'
import {WebView, WebViewNavigation} from 'react-native-webview'
import {Helpers} from 'utils'
import services from 'services'
import {Alert} from 'react-native'
import {GetCardAddUrl} from 'allTypes'

type CardAddProps = {
  onSuccess: () => void
  onfail?: () => void
}
const CardAdd = ({onSuccess, onfail}: CardAddProps) => {
  const [urlData, setUrlData] = useState<GetCardAddUrl | undefined>(undefined)
  const navigationStateChange = useCallback(
    (event: WebViewNavigation) => {
      if (event.url.includes(urlData?.success_url)) {
        Alert.alert('sdaf')
        onSuccess()
      } else if (event.url.includes(urlData?.failed_url)) {
        onfail && onfail()
      }
    },
    [urlData],
  )

  const getCardAddUrl = async () => {
    try {
      const data = await services.getCardAddUrl()
      setUrlData(data)
    } catch (error) {
      Helpers.DisplayDropdownWithError()
    }
  }
  useEffect(() => {
    getCardAddUrl()
  }, [])

  return (
    <WebView
      source={{
        uri: urlData?.save_card_url,
      }}
      onNavigationStateChange={navigationStateChange}
    />
  )
}

export default React.memo(CardAdd)
