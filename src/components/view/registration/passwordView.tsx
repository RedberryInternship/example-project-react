import React from 'react';
import {View} from 'react-native';
import { Colors, Const } from '../../../../src/utils';
import { BaseInput } from '../../../../src/components';


const PasswordView = ({_this, hook} : any) => {
  
  const passwordTextHandler= (text : string) =>{
    _this.current.password = text
  }
  const passwordInputSubmit= () =>{
    hook.confirmedPassword.current.focus()
  }

  const repeatPasswordTextHandler= (text : string) =>{
    _this.current.confirmedPassword  = text
  }
  const repeatPasswordInputSubmit= () =>{
    hook.buttonClickHandler()
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal:16}} >
      <BaseInput
        image={require("../../../../assets/images/icons/lock.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={passwordTextHandler}
        onSubmit={passwordInputSubmit}
        secure={true}
        testID={"nameInput"}
        title={"authentication.registration.password"}
        returnKeyType={"next"}
        ref={hook.password}
      />
      <BaseInput
        image={require("../../../../assets/images/icons/lock.png")}
        imageStyle={{tintColor :Colors.primaryBlue}}
        keyboardType={"email-address"}
        onChangeText={repeatPasswordTextHandler}
        onSubmit={repeatPasswordInputSubmit}
        testID={"nameInput"}
        secure={true}
        title={"authentication.registration.repeatPassword"}
        returnKeyType={"send"}
        ref={hook.confirmedPassword}


      /> 
    </View>
  );
};


export default PasswordView;
