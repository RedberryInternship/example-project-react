/* eslint-disable react/display-name */
import React, { ReactElement } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import { useTranslation } from 'react-i18next'

import { Colors } from 'utils'
import BaseText from 'components/baseUI/BaseText'
import images from 'assets/images'
import { ChargingFinishedPopupEnum } from '../../../@types/allTypes.d'
import {
  BeforeFineLVL2FullCharge,
  UsedUpFast,
  Finished,
  Bankrupt,
} from './chargingFinishedPopupTypes'
import { ScrollView } from 'react-native-gesture-handler'

type ChargerModalMainWrapperProps = {
  onPress: () => void
  subType?: ChargingFinishedPopupEnum
  data: Data
}

type Data = {
  title: string
  description: string
  bottomDescription: string
  price: number
  time: string
  consumedMoney: number
  refundMoney: number
  onFine: boolean
  onFinish: () => void
  chargerTypeFAST: boolean
}

const ChargerModalMainWrapper = ({
  onPress,
  subType,
  data: { title, description, ...data },
}: ChargerModalMainWrapperProps): ReactElement => {
  const { t } = useTranslation()

  const subTypeHandler = (): ReactElement => {
    console.log(subType,ChargingFinishedPopupEnum.Bankrupt);
    switch (subType) {
      case ChargingFinishedPopupEnum.LVL2FullCharge:
        return <BeforeFineLVL2FullCharge {...data} />
      case ChargingFinishedPopupEnum.UsedUpFastProps:
        return <UsedUpFast {...data} />
      case ChargingFinishedPopupEnum.FinishedCharging:
        return <Finished {...data} />
      case ChargingFinishedPopupEnum.Bankrupt:
        return <Bankrupt {...data} />
      case ChargingFinishedPopupEnum.PaymentFailed:
        return <Bankrupt {...data} />

      default:
        return (
          <BaseText style={styles.bottomContentDescriptionType2}>
            {t('bottomDescription')}
          </BaseText>
        )
    }
  }

  return (
    <>
      <TouchableOpacity style={styles.touchableStyle} onPress={onPress}>
        <Image source={images.close} style={styles.closeIcon} />
      </TouchableOpacity>
      <ScrollView bounces={false}>
        <TouchableOpacity activeOpacity={1}>
          {
            (ChargingFinishedPopupEnum.PaymentFailed === subType || ChargingFinishedPopupEnum.Bankrupt === subType) ?
              <View style={{ flex: 0, marginHorizontal: 16, marginVertical: 16 }}>
                <Image source={images.alertCircle} style={styles.checkMarkIcon} />
                <BaseText style={styles.mainTitleStyle}>{t('dropDownAlert.error')}</BaseText>
                <BaseText style={[styles.mainDescriptionStyle,{color: 'indianred'}]}>
                  {t('popup.paymentFailed')}
                </BaseText>
              </View>
               :
              <View style={{ flex: 0, marginHorizontal: 16 }}>
                <Image source={images.checkCircle} style={styles.checkMarkIcon} />
                <BaseText style={styles.mainTitleStyle}>{t(title)}</BaseText>
                <BaseText style={styles.mainDescriptionStyle}>
                  {t(description)}
                </BaseText>
              </View>
          }

          <View style={styles.bottomContentContainer}>{subTypeHandler()}</View>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  touchableStyle: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#0199F011',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginRight: 16,
  },
  mainTitleStyle: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    color: Colors.primaryBackground,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 8,
  },
  mainDescriptionStyle: {
    fontSize: 11,
    lineHeight: 14,
    color: Colors.primaryGray,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: '2%',
    marginBottom: '6%',
  },
  bottomContentContainer: {
    flex: 0,
    marginHorizontal: 16,
    backgroundColor: '#90A3AD24',
    borderRadius: 8,
    padding: 16,
  },
  bottomContentDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: '#436880',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 8,
  },
  bottomContentDescriptionType2: {
    fontSize: 13,
    lineHeight: 16,
    color: '#436880',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginVertical: 16,
  },
  boldNumberBig: {
    fontSize: 17,
    lineHeight: 20,
    color: Colors.primaryBackground,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 8,
    fontWeight: 'bold',
  },

  subtype2Touchable: {
    marginVertical: 16,
    alignItems: 'center',
  },
  closeIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.primaryBlue,
  },
  checkMarkIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})

export default ChargerModalMainWrapper
