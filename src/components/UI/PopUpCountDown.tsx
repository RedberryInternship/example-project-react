import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

import { CountDown } from 'components'

const PopUpCountDown = ({ warningLevel, ...props }: any): ReactElement => {
  return (
    <View
      style={[
        styles.mainContainer,
        warningLevel === 1 ? styles.warningLevel1ForMainContainer : {},
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          warningLevel === 1 ? styles.warningLevel1ForInnerContainer : {},
        ]}
      >
        <CountDown {...props} popup={true} />
      </View>
    </View>
  )
}

export default PopUpCountDown

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#FF000F54',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 16,
  },
  innerContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    backgroundColor: 'rgba(255, 0, 15, 0.15)',
    borderColor: '#FF000F',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  warningLevel1ForInnerContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    borderColor: 'rgb(0, 122, 255)',
  },
  warningLevel1ForMainContainer: {
    borderColor: 'rgba(0, 122, 255, 0.4)',
  },
})
