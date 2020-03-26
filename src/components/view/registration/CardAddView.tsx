import React, {ReactElement} from 'react'
import {View} from 'react-native'
import {Const} from 'utils'

const CardAddView = ({_this}: any): ReactElement => {
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

export default CardAddView
