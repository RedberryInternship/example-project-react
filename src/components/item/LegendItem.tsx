import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ChargerMarkerColor} from '../../../@types/allTypes.d'
import RootPin from 'components/svg/chargerMarker/RootPin'
import {Colors} from 'utils'
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
    marginHorizontal: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopColor: Colors.primaryBackground.concat('22'),
    borderTopWidth: 1,
  },
  text: {
    color: '#436880',
    fontSize: 13,
  },
})
