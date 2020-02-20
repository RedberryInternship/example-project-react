import React from 'react'
import {View} from 'react-native'
import {Colors, Const} from 'utils'
import {BaseInput} from 'components'

const filterTextItem = ({_this, hook}: any) => {
  const nameTextHandler = (text: string) => {
    _this.current.name = text
  }
  const nameInputSubmit = () => {
    // hook.current.code = text
  }
  const surNameTextHandler = (text: string) => {
    _this.current.surname = text
  }
  const surNameInputSubmit = () => {}

  const emailTextHandler = (text: string) => {
    _this.current.email = text
  }
  const emailInputSubmit = () => {
    hook.buttonClickHandler()
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal: 16}}>
      <BaseInput
        image={require('../../../../assets/images/icons/user.png')}
        imageStyle={{tintColor: Colors.primaryBlue}}
        onChangeText={nameTextHandler}
        onSubmit={nameInputSubmit}
        testID={'nameInput'}
        title={'authentication.registration.name'}
        required={true}
        returnKeyType={'next'}
        ref={hook.name}
      />
      <BaseInput
        image={require('../../../../assets/images/icons/user.png')}
        imageStyle={{tintColor: Colors.primaryBlue}}
        onChangeText={surNameTextHandler}
        onSubmit={surNameInputSubmit}
        testID={'nameInput'}
        title={'authentication.registration.surname'}
        required={true}
        returnKeyType={'next'}
        ref={hook.surname}
      />
      <BaseInput
        image={require('../../../../assets/images/icons/mail.png')}
        imageStyle={{tintColor: Colors.primaryBlue}}
        keyboardType={'email-address'}
        onChangeText={emailTextHandler}
        onSubmit={emailInputSubmit}
        testID={'nameInput'}
        title={'authentication.registration.email'}
        returnKeyType={'go'}
        ref={hook.email}
      />
    </View>
  )
}

export default filterTextItem
