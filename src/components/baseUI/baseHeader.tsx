import React, {ReactElement} from 'react'
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useSafeArea} from 'react-native-safe-area-context'
import {Colors} from 'utils'
import {BaseNativeTouchable, BaseText} from 'components'
// import Images from 'assets/images'

type Header = {
  onPressLeft: () => void
  title: string
  onPressRight: () => void
  titleRight: string
}

const BaseHeader = ({
  onPressLeft,
  title,
  onPressRight,
  titleRight,
}: Header): Element => {
  const {t} = useTranslation()
  const insets = useSafeArea()

  const renderLeft = (): ReactElement => {
    return (
      onPressLeft && (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
          <BaseNativeTouchable
            onPress={onPressLeft}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 4,
            }}>
            {Platform.OS === 'ios' ? (
              <>
                <Image
                  source={require('../../../assets/images/icons/ios_back.png')}
                  style={styles.imageStyle}
                />
                <BaseText style={{color: '#D1CFD7', fontSize: 15}}>
                  {t('back')}
                </BaseText>
              </>
            ) : (
              <>
                <Image
                  source={require('../../../assets/images/icons/ios_back.png')}
                  style={styles.imageStyle}
                />
              </>
            )}
          </BaseNativeTouchable>
        </View>
      )
    )
  }

  const renderMiddle = (): Element => {
    return (
      title && (
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.primaryWhite, fontSize: 18}}>
            {t(title)}
          </Text>
        </View>
      )
    )
  }

  const renderRight = (): Element => {
    return (
      onPressRight && (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          <TouchableOpacity
            onPress={onPressRight}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 4,
            }}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
            <Text style={{color: '#FF9500', fontSize: 13, letterSpacing: 0.2}}>
              {t(titleRight)}
            </Text>
            <Image
              source={require('../../../assets/images/icons/ios_back.png')}
              style={styles.rightImageStyle}
            />
          </TouchableOpacity>
        </View>
      )
    )
  }
  return (
    <View style={[styles.mainContainer, {paddingTop: insets.top}]}>
      <View style={[styles.container]}>
        {renderMiddle()}
        {renderLeft()}
        {renderRight()}
      </View>
    </View>
  )
}

export default BaseHeader

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0,
    backgroundColor: Colors.primaryBackground,
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    height: Platform.OS === 'ios' ? 44 : 60,
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  imageStyle: {
    width: 21,
    height: 21,
    marginHorizontal: 4,
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: 9,
    height: 15,
    marginHorizontal: 8,
    resizeMode: 'contain',
    transform: [{rotateY: '180deg'}],
    tintColor: '#FF9500',
  },
})
