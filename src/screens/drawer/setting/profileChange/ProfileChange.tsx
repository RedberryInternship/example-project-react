import React, { useMemo } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BaseHeader from 'components/BaseHeader'
import BaseButton from 'components/BaseButton'
import PhoneChangeView from 'components/PhoneChangeView'
import PasswordChangeView from 'components/PasswordChangeView'
import CardListView from 'components/CardListView'
import AddCar from 'components/AddCar'
import SingleInputView from 'components/SingleInputView'
import { Colors } from 'utils'
import {
  FCWithNavigation,
  UserSettingEnum,
} from 'types'
import { useRoute } from '@react-navigation/native'
import useProfileChange from './useProfileChange'

const ProfileChange: FCWithNavigation = ({ navigation }) => {
  const { params } = useRoute<any>()
  const headerName = params.name
  const { type, inputName, value } = params

  const {
    triggerValidation,
    handleSubmit,
    getValues,
    setValue,
    register,
    control,
    submit,
    errors,
    watch,
  } = useProfileChange(navigation, type)

  const renderInputs = useMemo(() => {
    switch (type) {
      case UserSettingEnum.firstName:
      case UserSettingEnum.lastName:
        return (
          <SingleInputView
            control={control}
            errors={errors}
            value={value}
            type={type}
            inputName={inputName}
          />
        )
      case UserSettingEnum.email:
        return (
          <SingleInputView
            control={control}
            errors={errors}
            value={value}
            type={type}
            inputName={inputName}
          />
        )

      case UserSettingEnum.activeCard: // TODO
        return <CardListView />
      case UserSettingEnum.phone:
        return (
          <PhoneChangeView
            triggerValidation={triggerValidation}
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
            watch={watch}
          />
        )
      case UserSettingEnum.password:
        return (
          <PasswordChangeView
            control={control}
            errors={errors}
            watch={watch}
          />
        )
      case UserSettingEnum.addCar:
        return (
          <AddCar
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
          />
        )
      default:
        return <></>
    }
  }, [
    triggerValidation,
    getValues,
    inputName,
    setValue,
    register,
    control,
    errors,
    watch,
    value,
    type,
  ])

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <BaseHeader
          title={headerName}
          onPressLeft={navigation.navigate.bind(ProfileChange, 'Settings')}
        />

        <KeyboardAwareScrollView
          style={styles.keyboardAwareScrollView}
          bounces
          enableOnAndroid
          enableAutomaticScroll={false}
          extraHeight={0}
          extraScrollHeight={-150}
          enableResetScrollToCoords
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          {renderInputs}
        </KeyboardAwareScrollView>
      </View>

      {type !== UserSettingEnum.activeCard && (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'android' ? 8 : 16}
        >
          <BaseButton onPress={handleSubmit(submit)} text="save" />
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
  innerContainer: {
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
