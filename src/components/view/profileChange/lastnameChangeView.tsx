import React from 'react'

import {View, StyleSheet} from 'react-native'

import {useLastnameChange} from 'hooks'

// components
import {BaseInput} from 'components'

// images
import Imgs from '../../../../assets/images'

// types
import {ProfileFieldChange} from 'allTypes'

const lastnameChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange) => {
  const hook = useLastnameChange({navigation, clicked, setClicked})

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newLastname'}
        image={Imgs.blueUser}
        value={hook.lastname}
        onChangeText={hook.onChangeText}
        onSubmit={hook.onSubmitEditing}
        ref={hook.lastnameInputRef}
      />
    </View>
  )
}

export default lastnameChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
