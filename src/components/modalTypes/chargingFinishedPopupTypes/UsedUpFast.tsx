import React, {ReactElement} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ModalPopupChargerItem, BaseText} from 'components'
import {Colors} from 'utils'
type UsedUpFastProps = {
  bottomDescription: string
  price: number
}
const UsedUpFast = ({
  bottomDescription,
  price,
}: UsedUpFastProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <>
      <BaseText style={styles.bottomContentDescriptionType2}>
        {t(bottomDescription)}
      </BaseText>
      <View style={styles.lineView} />
      <View style={{marginVertical: 12}}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={(): void => {
            Alert.alert('not yet')
          }}
          style={styles.subtype2Touchable}
        >
          <Text style={{color: Colors.primaryGreen}}>
            {t('charger.allChargerList')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default UsedUpFast

const styles = StyleSheet.create({
  bottomContentDescriptionType2: {
    fontSize: 13,
    lineHeight: 16,
    color: '#436880',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginVertical: 16,
    marginBottom: 8,
  },
  lineView: {
    backgroundColor: Colors.primaryBackground,
    opacity: 0.1,
    height: 1,
    width: '100%',
    justifyContent: 'center',
  },
  subtype2Touchable: {
    marginVertical: 16,
    alignItems: 'center',
  },
})
