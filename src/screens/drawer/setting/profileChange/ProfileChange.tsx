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
import {Colors, Helpers, InputValidationHelpers} from 'utils'
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

  const renderInputs = useCallback(() => {
    switch (type) {
      case UserSettingEnum.firstName:
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
            validator={InputValidationHelpers.emailValidation}
          />
        )

      case UserSettingEnum.activeCard: // TODO
        return <CardListView />
      case UserSettingEnum.phone:
      case UserSettingEnum.password:
        return <PasswordChangeView {...form} />
      case UserSettingEnum.addCar:
        return <AddCar {...form} />
      default:
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
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode={'on-drag'}
          resetScrollToCoords={{x: 0, y: 0}}
          // scrollEnabled={false}
        >
          {renderInputs()}
        </KeyboardAwareScrollView>
      </View>

      {type !== UserSettingEnum.activeCard && (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'android' ? 8 : 16}
        >
          <BaseButton onPress={form.handleSubmit(submit)} text="save" />
        </KeyboardAvoidingView>
      )}
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
