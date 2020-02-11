import React from 'react'
import {Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'

const mainSearchItem = ({text, color}: any) => {
  const {t} = useTranslation()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        paddingLeft: 32,
        width: '50%',
      }}>
      <Text style={{color: '#436880', fontSize: 13}}>{t(text)}</Text>
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: color,
          marginLeft: 8,
          borderRadius: 6,
        }}
      />
    </View>
  )
}

export default mainSearchItem
