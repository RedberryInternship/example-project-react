import React from 'react'

import {View, StyleSheet} from 'react-native'

// components
import {BaseInput} from 'components'

// hooks
import {useEmailChange} from 'hooks'

// images
import Imgs from '../../../../assets/images'

// types
import {ProfileFieldChange} from 'allTypes'

const mailChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange) => {
  const hook = useEmailChange({navigation, clicked, setClicked})

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newMail'}
        image={Imgs.mail}
        value={hook.email}
        onChangeText={hook.onChangeText}
        onSubmit={hook.onSubmit}
        ref={hook.emailInputRef}
      />
    </View>
  )
}

export default mailChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
