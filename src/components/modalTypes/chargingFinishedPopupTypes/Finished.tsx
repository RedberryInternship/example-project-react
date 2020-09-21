import React, { ReactElement } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { HomeNavigateModes } from '../../../../@types/allTypes.d'
import ModalPopupChargerItem from 'components/item/ModalPopupChargerItem'
import BaseText from 'components/baseUI/BaseText'
import { NavigationActions, Colors } from 'utils'

type FinishedProps = {
  bottomDescription: string
  price: number
  consumedMoney: number
  refundMoney: number
  chargerTypeFAST: boolean
}
const Finished = ({
  bottomDescription,
  price,
  consumedMoney,
  refundMoney,
  chargerTypeFAST,
}: FinishedProps): ReactElement => {
  const { t } = useTranslation()

  return (
    <>
      <BaseText style={styles.bottomContentDescriptionType2}>
        {t(bottomDescription)}
      </BaseText>
      <View style={styles.lineView} />
      <View style={{ marginVertical: 12 }}>
        {price !== null && <ModalPopupChargerItem val={price} type={0} />}
        {consumedMoney !== null && (
          <ModalPopupChargerItem val={consumedMoney} type={1} />
        )}
        {refundMoney !== null && (
          <ModalPopupChargerItem val={refundMoney} type={2} />
        )}
        <View style={styles.lineView} />
        {chargerTypeFAST && (
          <TouchableOpacity
            onPress={(): void => {
              NavigationActions.navigate('Home', { mode: HomeNavigateModes.showAllChargers })
            }}
            style={styles.subtype2Touchable}
          >
            <BaseText style={{ color: Colors.primaryGreen }}>
              {t('charger.allChargerList')}
            </BaseText>
          </TouchableOpacity>
        )}
      </View>
    </>
  )
}

export default Finished

const styles = StyleSheet.create({
  bottomContentDescriptionType2: {
    fontSize: 13,
    lineHeight: 16,
    color: '#436880',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: '4%',
    marginVertical: '3%',
    marginBottom: '3%',
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
