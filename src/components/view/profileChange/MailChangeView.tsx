import React, {ReactElement} from 'react'

import {View, StyleSheet} from 'react-native'

// components
import {BaseInput} from 'components'

// hooks
import {useEmailChange} from 'hooks'

// images
import images from 'assets/images'

// types
import {ProfileFieldChange} from 'allTypes'

const MailChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange): ReactElement => {
  const hook = useEmailChange({navigation, clicked, setClicked})
  // Vobi todo: use destructure
  // Vobi Todo: use spell checker
  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newMail'}
        image={images.mail}
        value={hook.email}
        onChangeText={hook.onChangeText}
        onSubmit={hook.onSubmit}
        ref={hook.emailInputRef}
      />
    </View>
  )
}

export default MailChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
