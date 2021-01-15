import React from 'react'
import { WebView } from 'react-native-webview'
import { Colors } from 'utils'
import { StyleSheet } from 'react-native'
import { CardAddViewFC } from './types'
import useCardAddView from './useCardAddView'

const CardAddView: CardAddViewFC = ({ onSuccess, onFail }) => {
  const {
    navigationStateChange,
    urlData,
  } = useCardAddView(
    {
      onSuccess,
      onFail,
    },
  )

  return (
    <WebView
      source={{
        uri: urlData?.save_card_url,
      }}
      onNavigationStateChange={navigationStateChange}
      style={styles.webView}
      containerStyle={styles.webView}
      automaticallyAdjustContentInsets
      javaScriptEnabled
      showsVerticalScrollIndicator={false}
      scalesPageToFit
    />
  )
}

export default React.memo(CardAddView)

const styles = StyleSheet.create({
  webView: {
    backgroundColor: Colors.primaryBackground,
  },
})
