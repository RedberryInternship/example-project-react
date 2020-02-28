import React, {ReactElement} from 'react'

import {View, StyleSheet} from 'react-native'

// components
import {PhoneNumberInput, ReceiveCode} from 'components'

// hooks
import {usePhoneChange} from 'hooks'

// types
import {ProfileFieldChange} from 'allTypes'

const PhoneChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange): ReactElement => {
  const hook = usePhoneChange({navigation, clicked, setClicked})

  return (
    <View style={styles.container}>
      <PhoneNumberInput
        onSubmit={hook.phoneNumber.onSubmit}
        ref={hook.phoneInputRef}
        _this={hook.This}
        codeRef={hook.codeRef}
      />

      <ReceiveCode
        onChangeText={hook.receiveCode.textHandler}
        onSubmit={hook.receiveCode.onSubmit}
        receiveCode={hook.receiveCode.receiveCode}
        ref={hook.codeRef}
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
