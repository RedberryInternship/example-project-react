import React, {ReactElement, useCallback} from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {
  ScreenPropsWithNavigation,
  UserSettingEnum,
} from '../../../../../@types/allTypes.d'

import {
  BaseHeader,
  BaseButton,
  PhoneChangeView,
  PasswordChangeView,
  CardListView,
  AddCar,
  SingleInputView,
} from 'components'
import {Colors, Helpers} from 'utils'
import images from 'assets/images'
import useProfileChange from './useProfileChange'

const ProfileChange = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const headerName = navigation.getParam('name')
  const type: UserSettingEnum = navigation.getParam('type')
  const value = navigation.getParam('value')
  const inputName: string = navigation.getParam('inputName')

  const {submit, ...form} = useProfileChange(navigation, type)

  const renderInputs = useCallback(() => { // Vobi Todo: function still runs every time this component rerenders
    // Vobi Todo: useCallbacks are mostly used to avoid redeclaration of function on every rerender
    // Vobi Todo: you should wrap this in useMemo and render like {renderInputs}
    switch (type) {
      case UserSettingEnum.firstName:
        return (
          <SingleInputView
            value={value}
            {...form}
            type={type}
            inputName={inputName}
          />
        )

      case UserSettingEnum.lastName:
        return (
          <SingleInputView
            value={value}
            {...form}
            type={type}
            inputName={inputName}
          />
        )

      case UserSettingEnum.email:
        return (
          <SingleInputView
            value={value}
            {...form}
            type={type}
            inputName={inputName}
          />
        )

      // Vobi Todo: You can do this like this
      // case UserSettingEnum.firstName:
      // case UserSettingEnum.lastName:
      // case UserSettingEnum.email:
      //   return (
      //     <SingleInputView
      //       value={value}
      //       {...form}
      //       type={type}
      //       inputName={inputName}
      //     />
      //   )

      case UserSettingEnum.activeCard: // TODO
        Helpers.DisplayDropdownWithError('ჯერ არაა მზად')
        return <></>
        return <CardListView />
      case UserSettingEnum.phone:
        return <PhoneChangeView {...form} />
      case UserSettingEnum.password:
        return <PasswordChangeView {...form} />
      case UserSettingEnum.addCar:
        return <AddCar {...form} />
      default:
        Helpers.DisplayDropdownWithError('რანაირად?') // Vobi Todo: Helpers.DisplayDropdownWithError('რაფერ?')
        return <></>
    }
  }, [form.errors])

  return (
    <View style={styles.container}>
      <View style={styles.innherContainer}>
        <BaseHeader
          title={headerName}
          onPressLeft={navigation.navigate.bind(ProfileChange, 'Settings')}
        />

        <KeyboardAwareScrollView
          style={styles.keyboardAwareScrollView}
          bounces={true}
          enableOnAndroid={true}
          enableAutomaticScroll={false}
          extraHeight={0}
          extraScrollHeight={-150}
          enableResetScrollToCoords={true}
          keyboardShouldPersistTaps={'handled'}
          resetScrollToCoords={{x: 0, y: 0}}
        >
          {renderInputs()}
        </KeyboardAwareScrollView>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'android' ? 50 : 20}
      >
        <BaseButton
          onPress={form.handleSubmit(submit)}
          text="save"
          image={images.arrowLeft}
          isImageRight
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default ProfileChange

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: Colors.primaryBackground,
  },
  innherContainer: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  keyboardAvoidingViewContainer: {
    backgroundColor: Colors.primaryBackground,
    justifyContent: 'space-between',
  },
})
