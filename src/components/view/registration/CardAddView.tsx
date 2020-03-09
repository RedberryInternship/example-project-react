import React from 'react'
import {View} from 'react-native'
import {Const} from 'utils'

const PasswordView = ({_this}: any) => {
  // Vobi Todo: naming is important
  return (
    <View
      style={{
        width: Const.Width,
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: 'red',
      }}></View>
  ) // Vobi Todo: stylesheet
}

export default PasswordView
