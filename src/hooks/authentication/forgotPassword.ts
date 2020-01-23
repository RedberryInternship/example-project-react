import { useState, useRef } from "react";
import { Animated, Alert } from "react-native"

import { useTranslation } from 'react-i18next';
import { Ajax } from '../../utils';

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
    const isValidationResultSuccessful = validatePhoneNumber() && validateCode() && isUserRegistered();
    
    if( isValidationResultSuccessful ){
      navigation.navigate('SetNewPasswords', {
        phone: _this.current.phone,
        code: _this.current.code 
      });
    }
  }

  const validatePhoneNumber = () : boolean => {
    // TODO
  }

  const validateCode = () : boolean => {
    // TODO
  }

  const isUserRegistered = () : boolean => {
    // TODO
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

  const codeReceiveHandler = () => {

    if (_this.current.codeReceiveDisabled) return;



    _this.current.codeReceiveDisabled = true;
    _this.current.codeReceiveAnimation.setValue(0);

    setStartCodeAnimation(true);

    //ajax
  }

  return {
    loading, SetLoading, phoneTextHandler, phoneInputSubmit, onButtonClick,
    codeTextHandler, codeInputSubmit, _this, phoneRef, startCodeAnimation,
    phoneFocused, t, codeReceiveHandler, codeRef, onFocusPhone, CodeInputWidth
  }
}