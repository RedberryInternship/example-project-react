import React, {ReactElement} from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {ScreenPropsWithNavigation} from 'allTypes'

import images from 'assets/images'
import {Colors} from 'utils'
import {BaseHeader, BaseButton, RegistrationPagination} from 'components'
import PhoneNumberView from './components/PhoneNumberView'
import UserInfoView from './components/UserInfoView'
import PasswordView from './components/PasswordView'
import CardAddContainer from './components/CardAddContainer'
import useRegistration from './useRegistration'

const Registration = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const insets = useSafeAreaInsets()

  const {
    flatListRef,
    paginationClickHandler,
    KeyboardAwareScrollViewRef,
    activePage,
    headerRightClick,
    registrationStepHandler,
    regStep1,
    regStep2,
    regStep3,
    regStep4,
    onCardAddSuccess,
    backButtonClick,
  } = useRegistration(navigation)

  const pages = [
    <PhoneNumberView hook={regStep1} key={1} activePage={activePage} />,
    <UserInfoView hook={regStep2} key={2} activePage={activePage} />,
    <PasswordView hook={regStep3} key={3} activePage={activePage} />,
    <CardAddContainer
      onSuccess={onCardAddSuccess}
      key={4}
      activePage={activePage}
    />,
  ]

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        onPressLeft={() => {
          backButtonClick()
        }}
        title={'authentication.registration.registration'}
        titleRight={'authentication.registration.skip'}
        onPressRight={activePage === 3 ? headerRightClick : undefined}
      />
      <RegistrationPagination
        paginationClickHandler={paginationClickHandler}
        activePage={activePage}
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
        ref={KeyboardAwareScrollViewRef}
      >
        <FlatList
          pagingEnabled={true}
          style={styles.flatList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          ref={flatListRef}
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={false}
          data={pages}
          renderItem={({item}): ReactElement => item}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 16}
      >
        {activePage < 3 && (
          <BaseButton
            onPress={registrationStepHandler[activePage]}
            text={'next'}
            image={images.arrowRight}
            style={styles.baseButton}
            imageStyle={styles.baseButtonImageStyle}
          />
        )}
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
