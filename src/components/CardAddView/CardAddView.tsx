import React from 'react'
import { WebView } from 'react-native-webview'
import { Colors } from 'utils'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { CardAddViewFC } from './types'
import useCardAddView from './useCardAddView'

const CardAddView: CardAddViewFC = ({ onSuccess, onFail }) => {
  const {
    navigationStateChange,
    urlData,
    loading,
  } = useCardAddView(
    {
      onSuccess,
      onFail,
    },
  )

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: urlData?.save_card_url,
        }}
        onNavigationStateChange={navigationStateChange}
        style={{ ...styles.webView, opacity: loading ? 0 : 1 }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
        containerStyle={styles.webView}
        javaScriptEnabled
        scalesPageToFit
      />
      {loading && <ActivityIndicator size="large" style={styles.spinner} />}
    </View>
  )
}

export default React.memo(CardAddView)

const styles = StyleSheet.create(
  {
    container: {
      position: 'relative',
      flex: 1,
    },
    webView: {
      backgroundColor: Colors.primaryBackground,
    },
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [
        {
          translateX: -10,
        },
        {
          translateY: -10,
        },
      ],
    },
  },
)
