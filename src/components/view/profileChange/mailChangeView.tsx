import React, {useState, useEffect} from 'react'

import {View, Alert, StyleSheet} from 'react-native'

// components
import {BaseInput} from 'components'

const mailChangeView = ({clicked, setClicked, navigation}: any) => {
  const [mail, setMail] = useState('')

  useEffect(() => {
    if (clicked === true) {
      // if button clicked
      updateUserMail(mail, navigation, setClicked)
    }
  })

  return (
    <View style={styles.container}>
      <BaseInput
        title={'settings.newMail'}
        image={require('../../../../assets/images/icons/mail.png')}
        onChangeText={(text: string) => setMail(text)}
        onSubmitEditing={() => {
          updateUserMail(mail, navigation, setClicked)
        }}
      />
    </View>
  )
}

const updateUserMail = (mail: any, navigation: any, setClicked: any = null) => {
  if (ValidateEmail(mail)) {
    Alert.alert('mail Updated!', '', [
      {text: 'Got it', onPress: () => navigation.goBack()},
    ])
  } else {
    Alert.alert('InvalidEmail', '', [
      {
        text: 'Got it',
        onPress: () => {
          setClicked(false)
        },
      },
    ])
  }
}

const ValidateEmail = (mail: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (emailRegex.test(mail)) {
    return true
  }
  return false
}

export default mailChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
