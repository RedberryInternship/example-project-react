import React from 'react'
import {View, Alert} from 'react-native'
import {Const} from 'utils'
import {PhoneVerificationView} from 'components'

type PhoneNumberViewProps = {
  hook: Record<string, any>
  activePage: number
}
// eslint-disable-next-line react/display-name
const PhoneNumberView = React.memo(
  ({hook}: PhoneNumberViewProps): React.ReactElement => {
    return (
      <View style={{width: Const.Width, paddingHorizontal: 16}}>
        <PhoneVerificationView {...hook} formType='registers' />
      </View>
    )
  },
  ({activePage}, {activePage: nextActivePage}) =>
    nextActivePage != 0 && activePage != 0,
)

export default PhoneNumberView
