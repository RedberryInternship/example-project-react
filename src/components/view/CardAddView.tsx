/* eslint-disable @typescript-eslint/camelcase */
import React, {useCallback, useState, useEffect} from 'react'
import {WebView, WebViewNavigation} from 'react-native-webview'
import {Helpers, Colors} from 'utils'
import services from 'services'
import {Alert, StyleSheet} from 'react-native'
import {GetCardAddUrl} from 'allTypes'

type CardAddViewProps = {
  onSuccess: () => void
  onFail?: () => void
}
const CardAddView = ({onSuccess, onFail}: CardAddViewProps) => {
  const [urlData, setUrlData] = useState<GetCardAddUrl | undefined>() // Vobi Todo: useState default value is undefined
  const navigationStateChange = useCallback(
    (event: WebViewNavigation) => {
      if (event.url.includes(urlData?.success_url)) {
        onSuccess()
      } else if (event.url.includes(urlData?.failed_url)) {
        onFail && onFail()
        getCardAddUrl()
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
      style={styles.webView}
      containerStyle={styles.webView}
      automaticallyAdjustContentInsets={true}
      javaScriptEnabled={true}
      showsVerticalScrollIndicator={false}
      scalesPageToFit={true}
    />
  )
}

export default React.memo(CardAddView)

const styles = StyleSheet.create({
  webView: {
    backgroundColor: Colors.primaryBackground,
  },
})
