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

export default (navigation: any) => {

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

    if (isValidationResultSuccessful) {

      verifyCode()
        .then(() => {
          navigation.navigate('SetNewPasswords', {
            phone: _this.current.phone,
          })
        })
        .catch((e) => {
          switch (e.status) {

            case 401:
              Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.incorrectCode"));
              return;

            case 409:
              Defaults.dropdown.alertWithType("error", t("dropDownAlert.forgotPassword.userNotFound"));
              return;

            case 440:
              Defaults.dropdown.alertWithType("error", t("dropDownAlert.forgotPassword.smsCodeExpired"));
              return;

          }
        });

    }
  }

  const validatePhoneNumber = (withGetSmsVerificationAlert = true): boolean => {

    const countryCode = getSelectedCountryPhoneCode();

    if (countryCode === "995") {

      const isPhoneValidationSuccessful = validateOnGeorgianPhoneCode();
      if (isPhoneValidationSuccessful) {

        if (withGetSmsVerificationAlert && startCodeAnimation === false) {
          Defaults.dropdown.alertWithType('error', t("dropDownAlert.forgotPassword.getVerificationCode"));
          phoneRef.current.blur();
        }
        else {
          codeRef.current.focus();
        }
        return true;
      }
      else {
        phoneRef.current.focus();
        return false;
      }
    }

    codeRef.current.focus();
    return true;
  }

  const validateCode = (): boolean => {

    if (_this.current.code.length === 0) {
      Defaults.dropdown.alertWithType('error', t("dropDownAlert.forgotPassword.fillCode"));
      return false;
    }
    else if (_this.current.code.length !== 4) {
      Defaults.dropdown.alertWithType('error', t("dropDownAlert.forgotPassword.smsCodeLength"));
      return false;
    }
    else {
      return true;
    }
  }

  const verifyCode = async () => {
    const verifyCodeResults = await Ajax.post('/verify-code-for-password-recovery', {
      phone_number: _this.current.phone,
      code: _this.current.code
    });

    return verifyCodeResults;
  }

  const codeReceiveHandler = () => {

    if (_this.current.codeReceiveDisabled || !validatePhoneNumber(false)) return;

    _this.current.codeReceiveDisabled = true;
    _this.current.codeReceiveAnimation.setValue(0);

    setStartCodeAnimation(true);
    Ajax.post('/send-sms-code', {
      phone_number: _this.current.phone
    })
      .then(() => {

        setStartCodeAnimation(false);

      })
      .catch(() => {
        Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"));
      });

  }

  const validateOnGeorgianPhoneCode = () => {

    if (_this.current!.phone.length === 0) {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.fillPhoneNumber"));
    }
    else if (_this.current!.phone.length !== 9) {
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

    if (val.length > 4) {
      codeRef.current.setNativeProps({
        text: _this.current.code
      });
      return;
    }

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
    codeTextHandler, codeInputSubmit, _this, phoneRef, startCodeAnimation, setStartCodeAnimation,
    phoneFocused, t, codeReceiveHandler, codeRef, onFocusPhone, CodeInputWidth
  }
}