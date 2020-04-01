/* eslint-disable react/display-name */
import React, {useState, useEffect, ReactElement} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {Colors} from 'utils'
import {useTranslation} from 'react-i18next'
import {PopUpCountDown, ModalPopupChargerItem} from 'components'
import Imgs from '../../../assets/images'

type ChargerModalMainWrapperProps = {
  onPress: () => void
  subType: number | undefined
  data: Data
}

type Data = {
  title: string
  description: string
  bottomDescription: string
}

const ChargerModalMainWrapper = ({
  onPress,
  subType,
  data: {title, description, bottomDescription},
}: ChargerModalMainWrapperProps): ReactElement => {
  const {t} = useTranslation()
  const [view, setView] = useState<ReactElement[]>([])

  useEffect(() => {
    subTypeHandler() // Vobi Todo: remove useEffect
  }, [])

  const subTypeHandler = (): void => {
    const _view = [] // Vobi todo: i can not understand what this view does
    // Vobi todo: i think it must be object and its key should be self descriptive
    switch (subType) {
      case 1:
        _view[0] = (
          <Text style={styles.bottomContentDescriptionType2}>
            {t(bottomDescription)}
          </Text>
        )
        _view[1] = (
          <View style={{marginVertical: 32}}>
            <Text style={styles.bottomContentDescriptionType2}>
              {t('ანგარიშიდან ჩამოგეჭრათ')}
            </Text>
            <Text style={styles.boldNumberBig}>
              {23} {t('gel')}
            </Text>
          </View>
        )
        break
      case 2:
        _view[0] = (
          <>
            <Text style={styles.bottomContentDescription}>
              {t(bottomDescription)}
            </Text>
            <PopUpCountDown up={true} warningLevel={1} />
          </>
        )

        _view[1] = (
          <View style={{marginVertical: 12}}>
            {[
              {val: 3, type: 0},
              {val: 3, type: 1},
              {val: 33, type: 2},
            ].map((val, ind) => (
              //TODO: not stable data options from back
              <ModalPopupChargerItem key={ind} {...val} />
            ))}
          </View>
        )
        break
      case 3:
        _view[2] = (
          <>
            <View style={styles.lineView} />
            <TouchableOpacity
              //TODO: no action known yet
              onPress={(): void => {}}
              style={styles.subtype2Touchable}>
              <Text style={{color: Colors.primaryGreen}}>
                {t('charger.allChargerList')}
              </Text>
            </TouchableOpacity>
          </>
        )

        break
      default:
        _view[0] = (
          <Text style={styles.bottomContentDescriptionType2}>
            {t(bottomDescription)}
          </Text>
        )

        break
    }

    setView(_view) // Vobi Todo: why do you need to update state you should render it once
  }

  return (
    <>
      <TouchableOpacity style={styles.touchableStyle} onPress={onPress}>
        <Image source={Imgs.close} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={{flex: 0, marginHorizontal: 16}}>
        <Image source={Imgs.checkCircle} style={styles.checkMarkIcon} />
        <Text style={styles.mainTitleStyle}>{t(title)}</Text>
        <Text style={styles.mainDescriptionStyle}>{t(description)}</Text>
      </View>
      <View style={styles.bottomContentContainer}>
        {view[0]}
        <View style={styles.lineView} />
        {view[1]}
        {view[2]}
      </View>
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
