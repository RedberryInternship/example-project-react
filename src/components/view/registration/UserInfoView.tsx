import React, {ReactElement} from 'react'
import {View} from 'react-native'
import {Colors, Const} from 'utils'
import {BaseInput} from 'components'
import Imgs from '../../../../assets/images'

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
    _this.current.email = text
  }
  const emailInputSubmit = (): void => {
    hook.buttonClickHandler()
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal: 16}}>
      <BaseInput
        image={Imgs.user}
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
        image={Imgs.user}
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
        image={Imgs.user}
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

export default FilterTextItem
