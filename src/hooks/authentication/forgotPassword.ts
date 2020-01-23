import { useState, useRef } from "react";
import { Animated } from "react-native"

import { useTranslation } from 'react-i18next';
import { Ajax, Defaults } from '../../utils';

type _This = {
  code: string,
  phone: string,
  codeReceiveAnimation: Animated.Value,
  codeReceiveDisabled: Boolean
}
const CodeInputWidth = 128

export default ( navigation : any ) => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);
  const [startCodeAnimation, setStartCodeAnimation] = useState<any>(false);
  const phoneRef: any = useRef(null);
  const codeRef: any = useRef(null);

  const { t } = useTranslation();

  const _this = useRef<_This>({
    code: '',
    phone: '',
    codeReceiveAnimation: new Animated.Value(CodeInputWidth),
    codeReceiveDisabled: false
  });


  const onButtonClick = () => {
    const isValidationResultSuccessful = validatePhoneNumber() && validateCode();
    
    if( isValidationResultSuccessful ){
      console.log("Should go into verifyCode");

      // TODO: This Should be deleted as soon as Gulverd will make verifyCode api for password recovery
      navigation.navigate('SetNewPasswords', {
        phone: _this.current.phone,
      });
      // ================

      verifyCode(() => {
        
        navigation.navigate('SetNewPasswords', {
          phone: _this.current.phone,
        });
      
      });
    }
  }

  const validatePhoneNumber = (witGetSmsVerificationAlert = true) : boolean => {

    const countryCode = getSelectedCountryPhoneCode();

    if(countryCode === "995"){

      const isPhoneValidationSuccessful = validateOnGeorgianPhoneCode();
      if(isPhoneValidationSuccessful){
        
        if(witGetSmsVerificationAlert && startCodeAnimation === false){
          Defaults.dropdown.alertWithType('error', t("dropDownAlert.forgotPassword.getVerificationCode"));
        }
        else{
          codeRef.current.focus();
        }
        return true;
      }
      else{
        phoneRef.current.focus();
        return false;
      }
    }

    codeRef.current.focus();
    return true;
  }

  const validateCode = () : boolean => {
    
      if(_this.current.code.length !== 4){
        Defaults.dropdown.alertWithType('error', t("dropDownAlert.forgotPassword.smsCodeLength"));
        return false;
      }
      else{
        return true;
      }
  }

  const verifyCode = async (cb: (data : any) => void)  => {
    try{
      const verifyCodeResults = await Ajax.post('/verify-code', {
        phone_number: _this.current.phone
      });

    verifyCodeResults.then((data: any) => cb(data));
    }
    catch(e){
      console.log(['[Exception] VerifyCode', e]); 
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.forgotPassword.incorrectCode"));
    }

    return false;
  }

  const codeReceiveHandler = () => {

    if (_this.current.codeReceiveDisabled || !validatePhoneNumber(false) ) return;

    _this.current.codeReceiveDisabled = true;
    _this.current.codeReceiveAnimation.setValue(0);

    Ajax.post('/send-sms-code', {
      phone_number: _this.current.phone
    })
    .then(() => {
      setStartCodeAnimation(true);
    })
    .catch((err) => {
      console.log(err);
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"));
    });
  }

  const validateOnGeorgianPhoneCode = () => {

    if (_this.current!.phone.length !== 9) {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.phoneNumberLength"));
      return false;
    }
    else {
      return true;
    }

  }


  const phoneTextHandler = (val: string) => {
    phoneRef.current.setNativeProps({
      text: val
    })
    _this.current.phone = val;
  }

  const phoneInputSubmit = () => {
    validatePhoneNumber();
  }

  const getCountryPhoneCodes = async () => {

    try {
      const countryPhoneCodes = await Ajax.get('/phone-codes');

      return countryPhoneCodes;
    }
    catch (e) {

      // TODO: what kind of errors is there to handle

      Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"));
    }
  }

  const getSelectedCountryPhoneCode = () => {

    // TODO: get selected Phone Code

    return "995";

  }



  const codeTextHandler = (val: string) => {
    codeRef.current.setNativeProps({
      text: val
    })
    _this.current.code = val;
  }

  const codeInputSubmit = () => {
    //

  }



  const onFocusPhone = () => {
    setPhoneFocused(true)
  }


  return {
    loading, SetLoading, phoneTextHandler, phoneInputSubmit, onButtonClick,
    codeTextHandler, codeInputSubmit, _this, phoneRef, startCodeAnimation,
    phoneFocused, t, codeReceiveHandler, codeRef, onFocusPhone, CodeInputWidth
  }
}