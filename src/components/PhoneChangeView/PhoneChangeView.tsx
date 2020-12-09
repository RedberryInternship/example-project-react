import React from 'react'
import { View, StyleSheet } from 'react-native'
import { PhoneVerificationView } from 'components'
import usePhoneVerification from 'hooks/usePhoneVerification'
import { PhoneChangeViewFC } from './types'

const PhoneChangeView: PhoneChangeViewFC = (
  {
    setValue,
    watch,
    triggerValidation,
    getValues,
    register,
    errors,
  },
) => {
  const hook = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  return (
    <View style={styles.container}>
      <PhoneVerificationView
        {...hook}
        setValue={setValue}
        watch={watch}
        formType="phone_change"
      />
    </View>
  )
}

export default PhoneChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
