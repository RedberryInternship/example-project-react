import React, {ReactElement} from 'react'

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import {Colors} from 'utils'
import images from 'assets/images'
import MarkerController from 'components/svg'

type ChargerGroupPupupItemProp = {
  code: string | number | null
  onPress: () => void | null
  active: number
  text: string
  publicCharger: number
  connectorType: string
}

const ChargerGroupPopupItem = ({
  code,
  onPress,
  active,
  text,
  publicCharger,
  connectorType,
}: ChargerGroupPupupItemProp): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} disabled={active === 1 ? false : true}>
      <View style={styles.container}>
        <MarkerController
          active={active}
          publicCharger={publicCharger}
          connectorType={connectorType}
          width={26}
          height={32}
        />
        <View style={styles.chargerTypeContainer}>
          <Text style={styles.chargerTypeText}>{text}</Text>
          <Text style={styles.chargerCodeText}>#{code}</Text>
        </View>
        <Image
          style={[styles.goToDetailIcon, {opacity: active === 1 ? 1 : 0.2}]}
          source={images.back}
        />
      </View>
    </TouchableOpacity>
  )
}

export default ChargerGroupPopupItem

const styles = StyleSheet.create({
  container: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: Colors.primaryBackground.concat('33'),
    borderTopWidth: 1,
  },
  chargerPin: {
    width: 26,
    height: 32,
    resizeMode: 'contain',
  },
  chargerTypeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  chargerTypeText: {
    color: '#436880',
    marginBottom: 4,
    fontSize: 13,
  },
  chargerCodeText: {
    color: '#111314',
    fontSize: 11,
  },
  goToDetailIcon: {
    width: 12,
    height: 21,
  },
})
