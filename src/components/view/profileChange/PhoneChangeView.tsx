import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {ProfileFieldChange} from 'allTypes'

import {PhoneNumberInput, ReceiveCode} from 'components'
import {usePhoneChange} from 'hooks'

const PhoneChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange): ReactElement => {
  const hook = usePhoneChange({navigation, clicked, setClicked})
  // Vobi Todo: use destructure
  return (
    <View style={styles.container}>
      <PhoneNumberInput
        onSubmit={hook.phoneNumber.onSubmit}
        ref={hook.phoneInputRef}
        _this={hook._this}
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
