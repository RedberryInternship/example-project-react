import {useState,useRef} from "react";
import {Alert} from "react-native"
import {useTranslation} from 'react-i18next';
import { Defaults, Ajax } from '../../utils';

type _This = {
  newPassword : string,
  repeatPassword : string,
}


export default (navigation : any) => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const newPasswordRef : any = useRef(null);
  const repeatPasswordRef : any = useRef(null);

  const { t} = useTranslation();
  const _this  = useRef<_This>({ newPassword : "", repeatPassword:"" })


  const onClickSubmitButton = () => {
    if(validateNewPasswordInput() && validateRepetePasswordInput()){
      setNewPassword()
      .then(({json_status}: any) => {
        
        if(json_status === "Password Changed"){
          Defaults.dropdown.alertWithType('success', t('dropDownAlert.forgotPassword.passwordChangedSuccessfully'));
          navigation.navigate('Auth');
        }
        else{
          Defaults.dropdown.alertWithType('error', t('dropDownAlert.generalError'));
        }
      })
      .catch((err) => {
        console.log(err);
        Defaults.dropdown.alertWithType('error', t('dropDownAlert.generalError'));
      });
    }
  }


  const newPasswordTextHandler = (val : string) => {
    _this.current.newPassword = val;
  }

  const newPasswordInputSubmit = () => {
    if(validateNewPasswordInput() === true){
      repeatPasswordRef.current.focus();
    }
  }

  const validateNewPasswordInput = () : boolean => {
    if(_this.current.newPassword.length === 0){
      Defaults.dropdown.alertWithType('error', t('dropDownAlert.forgotPassword.newPasswordNotFilled'));
      return false;
    }
    else if(_this.current.newPassword.length < 8 ){
      Defaults.dropdown.alertWithType('error', t('dropDownAlert.forgotPassword.newPasswordIncorrectLength'));
      return false;
    }
    else{
      return true;
    }
  }

  
  const repeatPasswordTextHandler = (val : string) => {
    _this.current.repeatPassword = val;
  }

  const repeatPasswordInputSubmit = () => {
    validateRepetePasswordInput();
  }

  const validateRepetePasswordInput = () : boolean => {
    if(_this.current.newPassword !== _this.current.repeatPassword){

      if(_this.current.repeatPassword.length === 0){
        repeatPasswordRef.current.focus();
        Defaults.dropdown.alertWithType('error', t('dropDownAlert.forgotPassword.repeteNewPasswordNotFilled'));
      }
      else{
        cleanPaswordFieldsAndFocusOnNewPassword();
      }

      return false;
    }
    else{
      return true;
    }
  }

  const cleanPaswordFieldsAndFocusOnNewPassword = () => {
    Defaults.dropdown.alertWithType('error', t('dropDownAlert.registration.passwordNotEqual'));
      
    newPasswordRef.current.setNativeProps({
      text: ''
    });
    _this.current.newPassword = '';

    repeatPasswordRef.current.setNativeProps({
      text: ''
    });
    _this.current.repeatPassword = '';

    newPasswordRef.current.focus();
  }

  const setNewPassword = async () => {
    return await Ajax.post('/reset-password', {
      phone_number: navigation.state.params.phone,
      password: _this.current.newPassword
    });
  }

  return {
      loading, SetLoading, newPasswordTextHandler,newPasswordInputSubmit,
      repeatPasswordTextHandler,repeatPasswordInputSubmit, _this,
      t, newPasswordRef, repeatPasswordRef, onClickSubmitButton
    }
}