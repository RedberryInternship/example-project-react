import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ChargerMarkerColor} from '../../../@types/allTypes.d'
import RootPin from 'components/svg/chargerMarker/RootPin'
type LegendItemProps = {
  text: string
  privateCharger?: boolean
  fastCharger?: boolean
}
const LegendItem = ({text, ...props}: LegendItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(text)}</Text>
      <RootPin
        pinColorType={ChargerMarkerColor.group}
        width={30}
        height={35}
        {...props}
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
