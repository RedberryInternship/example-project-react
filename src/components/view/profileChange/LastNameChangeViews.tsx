import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {ProfileFieldChange} from 'allTypes'

import {useLastnameChange} from 'hooks'
import {BaseInput} from 'components'
import images from '../../../assets/images'

const LastnameChangeView = ({
  navigation,
  clicked,
  setClicked,
}: ProfileFieldChange): ReactElement => {
  const hook = useLastnameChange({navigation, clicked, setClicked})

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newLastname'}
        image={images.blueUser}
        value={hook.lastname}
        onChangeText={hook.onChangeText}
        onSubmit={hook.onSubmitEditing}
        ref={hook.lastnameInputRef}
      />
    </View>
  )
}

export default LastnameChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
