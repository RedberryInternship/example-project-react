import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import MarkerRenderer from 'components/svg/chargerMarker/MarkerRenderer'

import {
  ChargerMarkerType,
  ChargerMarkerStatus,
} from '../../../@types/allTypes.d'
type LegendItemProps = {
  text: string
  type: ChargerMarkerType
}
const LegendItem = ({text, type}: LegendItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(text)}</Text>
      <MarkerRenderer
        type={type}
        status={ChargerMarkerStatus.forLegend}
        width={22}
        height={26}
      />
    </View>
  )
}

export default LegendItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#436880',
    fontSize: 13,
  },
  image: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
})
