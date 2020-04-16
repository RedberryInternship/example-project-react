import React, {ReactElement} from 'react'
import {StyleSheet} from 'react-native'

import {PhoneNumberInput, ReceiveCode} from 'components'

type PhoneVerificationViewProps = {
  watch: (name: string) => string
  setValue: (name: string, value: string, validate: boolean) => void
  receiveCodeHandler: () => any
  phoneRef: any
  codeRef: any
}

const PhoneVerificationView = ({
  setValue,
  watch,
  phoneRef,
  receiveCodeHandler,
  codeRef,
}: PhoneVerificationViewProps): ReactElement => {
  return (
    <>
      <PhoneNumberInput
        onChangeText={(text: string) => setValue('phone', text, true)}
        ref={phoneRef}
        value={watch('phone')}
      />
      <ReceiveCode
        ref={codeRef}
        onChangeText={(text: string) => setValue('code', text, true)}
        // onSubmit={handleSubmit(buttonClickHandler)}
        receiveCode={receiveCodeHandler}
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
