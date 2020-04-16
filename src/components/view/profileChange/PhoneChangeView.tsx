import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {PhoneVerificationView} from 'components'
import {usePhoneVerification} from 'hooks'

type PhoneChangeViewProps = {
  setValue: (name: string, value: string, validate: boolean) => void
  getValues: () => Record<string, any>
  register: (name: any, options: any) => void
  errors: Record<string, any>
  watch: (name: string) => string
  triggerValidation: (name: string) => Promise<boolean>
}

const PhoneChangeView = ({
  setValue,
  watch,
  triggerValidation,
  getValues,
  register,
  errors,
}: PhoneChangeViewProps): ReactElement => {
  const hook = usePhoneVerification({
    getValues,
    register,
    errors,
    watch,
    triggerValidation,
  })

  return (
    <View style={styles.container}>
      <PhoneVerificationView {...hook} setValue={setValue} watch={watch} />
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
