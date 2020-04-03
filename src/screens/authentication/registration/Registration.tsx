import React, {useContext, ReactElement} from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeArea} from 'react-native-safe-area-context'

import {ScreenPropsWithNavigation} from 'allTypes'

import {useRegistrationHook} from 'hooks'
import images from 'assets/images'
import {AppContext} from '../../../../App'
import {Colors} from 'utils'
import {BaseHeader, BaseButton, RegistrationPagination} from 'components'
import PhoneNumberView from './components/PhoneNumberView'
import UserInfoView from './components/UserInfoView'
import PasswordView from './components/PasswordView'
import CardAddView from './components/CardAddView'

const Registration = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {dispatch} = useContext(AppContext)
  const insets = useSafeArea()

  const hook = useRegistrationHook(navigation, dispatch)

  const pages = [
    <PhoneNumberView
      hook={hook.regStep1}
      key={1}
      activePage={hook.activePage}
    />,
    <UserInfoView
      _this={hook.regStep2._this}
      hook={hook.regStep2}
      key={2}
      activePage={hook.activePage}
    />,
    <PasswordView
      _this={hook.regStep3._this}
      hook={hook.regStep3}
      key={3}
      activePage={hook.activePage}
    />,
    <CardAddView _this={hook._this} key={4} activePage={hook.activePage} />,
  ]
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        onPressLeft={navigation.navigate.bind(Registration, 'Auth')}
        title={'authentication.registration.registration'}
        titleRight={'authentication.registration.skip'}
        onPressRight={hook.activePage === 3 ? hook.headerRightClick : undefined}
      />
      <RegistrationPagination
        paginationClickHandler={hook.paginationClickHandler}
        activePage={hook.activePage}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContentContainer}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        resetScrollToCoords={{x: 0, y: 0}}
        extraHeight={Platform.select({ios: -500, android: 0})}
        ref={hook.KeyboardAwareScrollViewRef}>
        <FlatList
          pagingEnabled={true}
          style={styles.flatList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          ref={hook.flatListRef}
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={false}
          data={pages}
          renderItem={({item}): ReactElement => item}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 16}>
        <BaseButton
          onPress={hook.registrationStepHandler}
          text={'next'}
          image={images.arrowRight}
          style={styles.baseButton}
          imageStyle={styles.baseButtonImageStyle}
        />
      </KeyboardAvoidingView>
    </View>
  )
}
export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.primaryBackground,
  },
  keyboardAwareScrollView: {
    flex: 0,
    marginVertical: 16,
  },
  keyboardAwareScrollViewContentContainer: {
    justifyContent: 'flex-start',
    flex: 0,
  },
  flatList: {
    flex: 0,
    flexGrow: 1,
  },
  flatListContentContainer: {
    flexGrow: 1,
    flex: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  baseButton: {
    marginTop: 0,
  },
  baseButtonImageStyle: {
    width: 21,
    height: 21,
  },
})
