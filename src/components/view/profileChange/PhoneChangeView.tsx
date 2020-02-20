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
        onSubmit={hook.onSubmit}
        ref={hook.phoneInputRef}
        _this={hook._this}
        codeRef={hook.codeRef}
      />

      <ReceiveCode
        onChangeText={hook.receiveCodeTextHandler}
        onSubmit={hook.receiveCodeOnSubmit}
        recieveCode={hook.recieveCode}
        ref={hook.codeRef}
        disableCodeInput={hook.recieveCodeButtonClicked}
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
