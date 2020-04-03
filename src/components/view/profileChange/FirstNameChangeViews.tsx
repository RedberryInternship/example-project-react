import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {ProfileFieldChange} from 'allTypes'

import {BaseInput} from 'components'
import {useFirstnameChange} from 'hooks'
import images from '../../../assets/images'

const FirstnameChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange): ReactElement => {
  const mainHook = useFirstnameChange({navigation, clicked, setClicked})

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newFirstname'}
        image={images.blueUser}
        onChangeText={mainHook.onChangeText}
        onSubmit={mainHook.onSubmitEditing}
        value={mainHook.firstname}
        ref={mainHook.firstnameInputRef}
      />
    </View>
  )
}

export default FirstnameChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
