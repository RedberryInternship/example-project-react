/* eslint-disable react/display-name */
import React, {useState, useEffect, ReactElement} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {PopUpCountDown, BaseText} from 'components'
import images from 'assets/images'
import {
  ChargingStatus,
  ChargingFinishedPopupEnum,
} from '../../../@types/allTypes.d'
import {
  BeforeFineLVL2FullCharge,
  UsedUpFast,
  Finished,
} from './chargingFinishedPopupTypes'

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
  data: {title, description, ...data},
}: ChargerModalMainWrapperProps): ReactElement => {
  const {t} = useTranslation()

  const subTypeHandler = (): ReactElement => {
    switch (subType) {
      case ChargingFinishedPopupEnum.LVL2FullCharge:
        return <BeforeFineLVL2FullCharge {...data} />
      case ChargingFinishedPopupEnum.UsedUpFastProps:
        return <UsedUpFast {...data} />
      case ChargingFinishedPopupEnum.FinishedCharging:
        return <Finished {...data} />

      // case ChargingFinishedPopupEnum.FinishedCharging: // TODO
      //   _view[0] = (
      //     <>
      //       <Text style={styles.bottomContentDescription}>
      //         {/* {t(bottomDescription)} */}
      //       </Text>
      //       <PopUpCountDown up={false} warningLevel={1} />
      //     </>
      //   )

      //   _view[1] = (
      //     <View style={{marginVertical: 12}}>
      //       <ModalPopupChargerItem key={ind} {...val} />

      //       {[
      //         {val: 3, type: 0},
      //         {val: 3, type: 1},
      //         {val: 33, type: 2},
      //       ].map((val, ind) => (
      //         //TODO: not stable data options from back
      //         <ModalPopupChargerItem key={ind} {...val} />
      //       ))}
      //     </View>
      //   )
      //   break
      // case 3:
      //   _view[2] = (
      //     <>
      //       <View style={styles.lineView} />
      //       <TouchableOpacity
      //         //TODO: no action known yet
      //         onPress={(): void => {}}
      //         style={styles.subtype2Touchable}
      //       >
      //         <Text style={{color: Colors.primaryGreen}}>
      //           {t('charger.allChargerList')}
      //         </Text>
      //       </TouchableOpacity>
      //     </>
      //   )

      //   break
      default:
        return (
          <Text style={styles.bottomContentDescriptionType2}>
            {t('bottomDescription')}
          </Text>
        )

        break
    }
  }

  return (
    <>
      <TouchableOpacity style={styles.touchableStyle} onPress={onPress}>
        <Image source={images.close} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={{flex: 0, marginHorizontal: 16}}>
        <Image source={images.checkCircle} style={styles.checkMarkIcon} />
        <BaseText style={styles.mainTitleStyle}>{t(title)}</BaseText>
        <BaseText style={styles.mainDescriptionStyle}>
          {t(description)}
        </BaseText>
      </View>
      <View style={styles.bottomContentContainer}>{subTypeHandler()}</View>
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
    marginTop: 8,
    marginBottom: 24,
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
