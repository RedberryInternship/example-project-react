import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

// components
import {BaseInput} from 'components'

// hooks
import {useFirstnameChange} from 'hooks'

// assets
import Imgs from '../../../../assets/images'

// types
import {ProfileFieldChange} from 'allTypes'

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
        image={Imgs.blueUser}
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
