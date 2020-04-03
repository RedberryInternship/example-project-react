import React, {ReactElement} from 'react'
import {View} from 'react-native'

import {Colors, Const} from 'utils'
import {BaseInput} from 'components'
import images from 'assets/images'

const FilterTextItem = ({_this, hook}: any): ReactElement => {
  const nameTextHandler = (text: string): void => {
    _this.current.name = text
  }
  const nameInputSubmit = (): void => {
    // hook.current.code = text
  }
  const surNameTextHandler = (text: string): void => {
    _this.current.surname = text
  }
  const surNameInputSubmit = (): void => {
    // TODO
  }

  const emailTextHandler = (text: string): void => {
    _this.current.email = text // Vobi todo: this is bad way to change value
    // Vobi Todo: use state hook useState() and handle changes inside it
  }
  const emailInputSubmit = (): void => {
    hook.buttonClickHandler()
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal: 16}}>
      <BaseInput
        image={images.user}
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
        image={images.user}
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
        image={images.user}
        imageStyle={{tintColor: Colors.primaryBlue}}
        keyboardType={'email-address'} // Vobi todo: have email, password types and toggle inside which to display
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

export default FilterTextItem
