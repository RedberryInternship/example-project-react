import React, {useState, useEffect} from 'react'

import {View, Alert, StyleSheet} from 'react-native'

// components
import {BaseInput} from 'components'

const firstnameChangeView = ({clicked, navigation}: any) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (clicked === true) {
      updateUserFirstname(name, navigation)
    }
  })

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newFirstname'}
        image={require('../../../../assets/images/icons/blue-user.png')}
        onChangeText={(text: string) => setName(text)}
        onSubmitEditing={() => {
          updateUserFirstname(name, navigation)
        }}
      />
    </View>
  )
}

const updateUserFirstname = (firstname: any, navigation: any) => {
  Alert.alert('Firstname Updated!', '', [
    {
      text: 'OK',
      onPress: () => {
        navigation.goBack()
      },
    },
  ])
}

export default firstnameChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
