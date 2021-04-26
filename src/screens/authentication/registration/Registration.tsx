import React from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  FlatList,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from 'assets/images'
import { Colors } from 'utils'
import RegistrationPagination from 'components/RegistrationPagination'
import BaseHeader from 'components/BaseHeader'
import BaseButton from 'components/BaseButton'
import { FCWithNavigation } from 'types'
import PhoneNumberView from './components/PhoneNumberView'
import UserInfoView from './components/UserInfoView'
import PasswordView from './components/PasswordView'
import CardAddContainer from './components/CardAddContainer'
import useRegistration from './useRegistration'

const Registration: FCWithNavigation = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const {
    KeyboardAwareScrollViewRef,
    registrationStepHandler,
    paginationClickHandler,
    headerRightClick,
    onCardAddSuccess,
    backButtonClick,
    flatListRef,
    activePage,
    regStep1,
    regStep2,
    regStep3,
  } = useRegistration(navigation)

  const pages = [
    <PhoneNumberView hook={regStep1} key={1} activePage={activePage} />,
    <UserInfoView hook={regStep2} key={2} activePage={activePage} />,
    <PasswordView hook={regStep3} key={3} activePage={activePage} />,
    <CardAddContainer
      onSuccess={onCardAddSuccess}
      activePage={activePage}
      key={4}
    />,
  ]

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <BaseHeader
        onPressLeft={backButtonClick}
        title="authentication.registration.registration"
        titleRight="authentication.registration.skip"
        onPressRight={activePage === 3 ? headerRightClick : undefined}
        rightComponentTestId="RegistrationSkipAddCardButton"
      />
      <RegistrationPagination
        paginationClickHandler={paginationClickHandler}
        activePage={activePage}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        contentContainerStyle={styles.keyboardAwareScrollViewContentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={-150}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={Platform.select({ ios: -500, android: 0 })}
        ref={KeyboardAwareScrollViewRef}
      >
        <FlatList
          pagingEnabled
          style={styles.flatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          data={pages}
          renderItem={({ item }) => item}
        />
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        contentContainerStyle={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 16}
      >
        {activePage < 3 && (
          <BaseButton
            onPress={registrationStepHandler[activePage]}
            text="next"
            image={images.arrowRight}
            style={styles.baseButton}
            imageStyle={styles.baseButtonImageStyle}
            testID="RegistrationNextButton"
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
