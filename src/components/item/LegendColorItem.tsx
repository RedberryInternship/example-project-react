import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'
import BaseText from 'components/baseUI/BaseText'

type LegendColorItemProps = {
  text: string
  color: string
}
const LegendColorItem = ({text, color}: LegendColorItemProps): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <BaseText style={styles.text}>{t(text)}</BaseText>
      <View style={[styles.backgrondView, {backgroundColor: color}]} />
    </View>
  )
}

export default LegendColorItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingLeft: 32,
    width: '50%',
  },
  text: {
    color: '#436880',
    fontSize: 12,
  },
  backgrondView: {
    width: 12,
    height: 12,
    marginLeft: 8,
    borderRadius: 6,
  },
})
