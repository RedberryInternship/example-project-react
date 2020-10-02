/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useState, useEffect } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { Colors } from 'utils'
import { DisplayDropdownWithError } from 'helpers/inform'
import services from 'services'
import { StyleSheet } from 'react-native'
import { GetCardAddUrl } from 'allTypes'
import { remoteLogger } from 'helpers/inform'

type CardAddViewProps = {
  onSuccess: () => void
  onFail?: () => void
}
const CardAddView = ({ onSuccess, onFail }: CardAddViewProps) => {
  const [urlData, setUrlData] = useState<GetCardAddUrl>()
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
      remoteLogger(error)
      DisplayDropdownWithError()
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
