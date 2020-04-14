import React from 'react'
import { View, Alert } from 'react-native'
import { Const } from 'utils'
import { PhoneNumberInput, ReceiveCode } from 'components'

type PhoneNumberViewProps = {
  hook: Record<string, any>
  activePage: number
}
// eslint-disable-next-line react/display-name
const PhoneNumberView = React.memo( // Vobi Todo: why do we have some views here and some of them in components.
  ({
    hook: {
      setValue,
      phoneRef,
      watch,
      codeRef,
      handleSubmit,
      buttonClickHandler,
      receiveCodeHandler,
    },
  }: PhoneNumberViewProps): React.ReactElement => {
    return (
      <View style={{ width: Const.Width, paddingHorizontal: 16 }}>
        <PhoneNumberInput
          onChangeText={(text: string) => setValue('phone', text, true)}
          ref={phoneRef}
          value={watch('phone')}
        />
        <ReceiveCode
          ref={codeRef}
          onChangeText={(text: string) => setValue('code', text, true)}
          onSubmit={handleSubmit(buttonClickHandler)}
          receiveCode={receiveCodeHandler}
        />
      </View>
    )
  },
  ({ activePage }, { activePage: nextActivePage }) =>
    nextActivePage != 0 && activePage != 0,
)

export default PhoneNumberView
