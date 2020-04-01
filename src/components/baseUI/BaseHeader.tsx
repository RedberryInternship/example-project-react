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
import images from 'assets/images'

type HeaderProps = {
  onPressLeft?: () => void
  title?: string
  onPressRight?: () => void
  titleRight?: string
}

const BaseHeader = ({
  onPressLeft,
  title,
  onPressRight,
  titleRight,
}: HeaderProps): ReactElement => {
  const {t} = useTranslation()
  const insets = useSafeArea()

  const renderLeft = (): ReactElement | undefined => {
    return (
      onPressLeft && (
        <View style={styles.renderLeftContainer}>
          <BaseNativeTouchable
            onPress={onPressLeft}
            style={styles.renderLeftTouchable}>
            {Platform.OS === 'ios' ? (
              <>
                <Image source={images.iosBack} style={styles.imageStyle} />
                <BaseText style={styles.renderLeftBaseText}>
                  {t('back')}
                </BaseText>
              </>
            ) : (
              <>
                <Image source={images.iosBack} style={styles.imageStyle} />
              </>
            )}
          </BaseNativeTouchable>
        </View>
      )
    )
  }

  const renderMiddle = (): ReactElement | undefined => {
    return title ? (
      <View style={styles.renderMiddleContainer}>
        <Text style={styles.renderMiddleText}>{t(title)}</Text>
      </View>
    ) : (
      undefined
    )
  }

  const renderRight = (): ReactElement | undefined => {
    return (
      onPressRight && (
        <View style={styles.renderRightConatainer}>
          <TouchableOpacity
            onPress={onPressRight}
            style={styles.renderRightTouchable}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
            <Text style={styles.renderRightText}>{t(titleRight ?? '')}</Text>
            <Image source={images.iosBack} style={styles.rightImageStyle} />
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
  renderLeftContainer: {
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  renderLeftTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 4,
  },
  renderLeftBaseText: {
    color: '#D1CFD7',
    fontSize: 15,
  },
  renderMiddleContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderMiddleText: {
    color: Colors.primaryWhite,
    fontSize: 17,
  },
  renderRightConatainer: {
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  renderRightTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 4,
  },
  renderRightText: {
    color: '#FF9500',
    fontSize: 13,
    letterSpacing: 0.2,
  },
})
