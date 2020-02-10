import { useState, useRef } from "react";

import { useTranslation } from 'react-i18next';
import { Ajax, Defaults } from '../../utils';

type _This = {
  code: string,
  phone: string
}

export default (navigation: any) => {

  const [recieveCodeButtonClicked, setRecieveCodeButtonClicked] = useState<boolean>(false);
  const [startCodeAnimation, setStartCodeAnimation] = useState<any>(false);
  const [disableCodeInput, setDisableCodeInput] = useState<boolean>(true);
  const phoneRef: any = useRef(null);
  const codeRef: any = useRef(null);

  const { t } = useTranslation();

  const _this = useRef<_This>({
    code: '',
    phone: ''
  });


  const onButtonClick = () => {
    const isValidationResultSuccessful = validation.validatePhoneNumber() && validation.validateCode();

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

  const verifyCode = async () => {
    
    const verifyCodeResults = await Ajax.post('/verify-code-for-password-recovery', {
      phone_number: _this.current.phone,
      code: _this.current.code
    });

    return verifyCodeResults;
  }

  const codeReceiveHandler = () => {

    if (!validation.validatePhoneNumber(false)) return;

    Ajax.post('/send-sms-code', {
      phone_number: _this.current.phone
    })
      .then(() => {
        codeRef.current.startCodeAnimation();
        Defaults.dropdown.alertWithType("success", t("dropDownAlert.registration.codeSentSuccessfully"));
        setDisableCodeInput(false);
      })
      .catch(() => {
        Defaults.dropdown.alertWithType("error", t("dropDownAlert.generalError"));
      });
    
    setRecieveCodeButtonClicked(true);
  }

  const codeInputSubmit = () => {
    codeReceiveHandler();
  }


  const phoneInputSubmit = () => {
    validation.validatePhoneNumber();
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


  
  // validation
  const validation = {
    validateCode: (): boolean => {

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
    },

    validateOnGeorgianPhoneCode: () => {
      if (_this.current!.phone.length < 5) {
        Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.fillPhoneNumber"));
      }
      else if (_this.current!.phone.length - 4 !== 9) {
        Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.phoneNumberLength"));
        return false;
      }
      else {
        return true;
      }
    },

    validatePhoneNumber: (withGetSmsVerificationAlert = true): boolean => {

      const isCountryCodeGeorgian = _this.current.phone.slice(0,4) === '+995' ? true : false;

      if (isCountryCodeGeorgian) {
  
        const isPhoneValidationSuccessful = validation.validateOnGeorgianPhoneCode();
        if (isPhoneValidationSuccessful) {
  
          if (withGetSmsVerificationAlert && recieveCodeButtonClicked === false) {
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
  }

  // return statement
  return {
    phoneInputSubmit, onButtonClick, disableCodeInput,
    codeTextHandler, codeInputSubmit, _this, phoneRef,
    t, codeReceiveHandler, codeRef,startCodeAnimation, 
    setStartCodeAnimation
  }
}