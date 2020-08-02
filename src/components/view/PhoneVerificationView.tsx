import React, {ReactElement} from 'react'
import {StyleSheet} from 'react-native'

import {PhoneNumberInput, ReceiveCode} from 'components'

type PhoneVerificationViewProps = {
  watch: (name: string) => string
  setValue: (name: string, value: string, validate: boolean) => void
  receiveCodeHandler: (formType: string) => any
  phoneRef: any
  codeRef: any
  formType: string
}

const PhoneVerificationView = ({
  setValue,
  watch,
  phoneRef,
  receiveCodeHandler,
  codeRef,
  formType,
}: PhoneVerificationViewProps): ReactElement => {
  return (
    <>
      <PhoneNumberInput
        onChangeText={(text: string) => setValue('phone', text, true)}
        ref={phoneRef}
        value={watch('phone')}
        onSubmit={() => {}}
      />
      <ReceiveCode
        ref={codeRef}
        onChangeText={(text: string) => setValue('code', text, true)}
        // onSubmit={handleSubmit(buttonClickHandler)}
        receiveCode={() => {receiveCodeHandler(formType)}}
      />
    </>
  )
}

export default PhoneVerificationView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
