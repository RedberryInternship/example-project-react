import React from 'react'
import PhoneNumberInput from 'components/PhoneNumberInput'
import ReceiveCode from 'components/ReceiveCode'
import { PhoneVerificationViewFC } from './types'

const PhoneVerificationView: PhoneVerificationViewFC = (
  {
    setValue,
    watch,
    phoneRef,
    receiveCodeHandler,
    codeRef,
    formType,
  },
) => (
  <>
    <PhoneNumberInput
      onChangeText={(text: string) => setValue('phone', text, true)}
      ref={phoneRef}
      value={watch('phone')}
      onSubmit={() => { }}
    />
    <ReceiveCode
      ref={codeRef}
      onChangeText={(text: string) => setValue('code', text, true)}
      receiveCode={() => { receiveCodeHandler(formType) }}
    />
  </>
)

export default PhoneVerificationView
