import React, {ReactElement} from 'react'
import ReceiveCode from 'components/UI/ReceiveCode'
import PhoneNumberInput from 'components/item/PhoneNumberInput'

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
        receiveCode={() => {receiveCodeHandler(formType)}}
      />
    </>
  )
}

export default PhoneVerificationView