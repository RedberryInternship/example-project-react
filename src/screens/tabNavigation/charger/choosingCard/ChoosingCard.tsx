import React, {ReactElement, useMemo} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import LinearGradient from 'react-native-linear-gradient'
import {SafeAreaView} from 'react-navigation'
import {ScrollView} from 'react-native-gesture-handler'

import {
  ScreenPropsWithNavigation,
  UserCard,
  ChargingTypes,
} from '../../../../../@types/allTypes.d'

import {
  BaseHeader,
  BaseButton,
  TitleTopLeftContainer,
  BaseInput,
  BaseText,
} from 'components'
import images from 'assets/images'
import {Const, Colors} from 'utils'
import useChoosingCard from './useChoosingCard'
import {ChooseCardOnCharging, BaseAddCardButton} from './components'
import {Controller} from 'react-hook-form'

const ChoosingCard = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {
    control,
    animatedArrow,
    slideUpPanelRef,
    setActiveCard,
    handleSubmit,
    submitHandler,
    errors,
    t,
    loading,
    state,
  } = useChoosingCard(navigation)

  const draggableRange = useMemo(
    () => ({
      bottom: Const.platformIOS ? 160 : 200,
      top:
        (Const.platformIOS ? 160 : 200) +
        ((state.user?.user_cards?.length ?? 0) + 1) * 50,
    }),
    [state],
  )

  const slidingUpTransformation = {
    transform: [
      {
        rotateX: animatedArrow.interpolate({
          inputRange: [draggableRange.bottom, draggableRange.top],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  }

  return (
    <>
      <View style={styles.container}>
        <BaseHeader
          onPressLeft={navigation.goBack}
          title={'chooseCard.chooseCard'}
        />
        <LinearGradient
          colors={['#009AF022', '#1065E322']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.gradinetContainer}
        >
          <ScrollView bounces={false}>
            {navigation.getParam('type', ChargingTypes.fullCharge) ==
            ChargingTypes.fullCharge ? (
              <View style={styles.contentsView}>
                <Image
                  source={images.checkCircle}
                  style={styles.contentsViewImage}
                />
                <BaseText>{t('chooseCard.chargingUntilPlugOff')}</BaseText>
              </View>
            ) : (
              <View style={styles.pricingView}>
                <Controller
                  as={BaseInput}
                  name="amount"
                  rules={{required: true,min: 1}}
                  control={control}
                  onChange={(args) => args[0].nativeEvent.text}
                  title={'chooseCard.enterPrice'}
                  image={images.briefCase}
                  returnKeyType={'send'}
                  errorText={errors.amount ? 'dropDownAlert.fillAmount' : ''}
                  keyboardType={'number-pad'}
                />
              </View>
            )}
          </ScrollView>
        </LinearGradient>
        <SlidingUpPanel
          ref={slideUpPanelRef}
          draggableRange={{...draggableRange}}
          snappingPoints={[draggableRange.top]}
          friction={0.5}
          animatedValue={animatedArrow}
          minimumDistanceThreshold={20}
          backdropOpacity={0.3}
        >
          <View style={styles.panelView}>
            <View>
              <Animated.Image
                source={images.chevronUp}
                style={[styles.slidingUpImage, slidingUpTransformation]}
              />
            </View>
            <TitleTopLeftContainer
              direction={'column'}
              title={''}
              data={state.user?.user_cards.sort((a, b) =>
                a.default !== 1 ? 1 : -1,
              )}
              onRenderItem={(val: UserCard, index) => (
                <ChooseCardOnCharging
                  key={val.id}
                  active={val.default === 1}
                  onPress={setActiveCard.bind(ChoosingCard, val.id)}
                  lastDigits={val.masked_pan}
                />
              )}
            />
            <BaseAddCardButton
              onPress={() => {
                navigation.navigate('CardAdd')
              }}
            />
          </View>
        </SlidingUpPanel>
        <SafeAreaView style={styles.safeAreaView} />
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.keyboardAvoidingView}
        >
          <BaseButton
            onPress={handleSubmit(submitHandler)}
            style={styles.turnOnBtn}
            text={'charger.turnOn'}
            imageStyle={{tintColor: 'white'}}
            image={images.charge}
            loading={loading}
          />
        </KeyboardAvoidingView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
    position: 'relative',
  },
  contentsView: {
    marginTop: '20%',
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  contentsViewImage: {
    width: 41,
    height: 41,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 16,
  },
  pricingView: {
    marginTop: '20%',
    paddingHorizontal: 16,
    alignItems: 'stretch',
    flex: 1,
  },
  panelView: {
    borderRadius: 16,
    backgroundColor: Colors.secondaryDark,
    flex: 1,
  },
  gradinetContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 10,
  },
  slidingUpImage: {
    width: 64,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  safeAreaView: {
    width: '100%',
    backgroundColor: Colors.secondaryDark,
    height: Platform.select({ios: 60, android: 80}),
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  turnOnBtn: {
    marginTop: 16,
    marginVertical: 16,
    marginBottom: Platform.select({ios: 16, android: 36}),
    marginHorizontal: 0,
    alignSelf: 'center',
    width: Const.Width - 44,
  },
  addCardStyle: {
    paddingRight: 32,
  },
})

export default ChoosingCard
