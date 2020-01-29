/* eslint-disable no-unused-vars */
import { useState, useRef, RefObject } from "react";
import { Alert, } from "react-native"
import { useTranslation } from 'react-i18next';
import { Defaults } from "../../../src/utils";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { saveToken } from "../actions/rootActions";

import { Ajax } from '../../utils';


type _This = {
  password: string,
  phone: string
}

type CountryPhoneCode = {
  country_code: string,
  phone_code: string
}

type User = {
  id: number,
  old_id: any,
  role: number,
  phone_number: string,
  first_name: string,
  last_name: string,
  email: string,
  active: number,
  verified: number,
  email_verified_at: any,
  temp_password: any,
  created_at: Date,
  updated_at: Date
}

type userData = {
  access_token: string,
  user: User,
  token_type: string,
  expires_in: number
}

type userErroredData = {
  error: string,
  status: number
}

export default (navigation: any, dispatch: any) => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);

  const phoneRef: any = useRef(null);
  const passwordRef: any = useRef(null);

  const { t } = useTranslation();

  const { setItem: setToken } = useAsyncStorage("token")
  const { setItem: setUserDetail } = useAsyncStorage("userDetail")


  const _this: RefObject<_This> = useRef({ password: "", phone: '' })


  const phoneInputSubmit = () => {

    const selectedPhoneCode = getSelectedCountryPhoneCode();

    if (_this.current?.phone.indexOf('+995') == 0) {

      const isPhoneValidationSuccessful = validateOnGeorgianPhoneCode();

      if (isPhoneValidationSuccessful) {
        passwordRef.current.focus();
        return true;
      }

      phoneRef.current.focus();
      return false;
    }
    else {
      passwordRef.current.focus();
      return true;
    }
  }

  const passwordTextHandler = (val: string) => {
    passwordRef.current.setNativeProps({
      text: val
    });
    _this.current!.password = val;
  }

  const passwordInputSubmit = () => {
    if (_this.current!.password === "") {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.passworNotEmpty"));
      return false;
    }
    else {
      return true;
    }
  }

  const onFocus = () => {
    setPhoneFocused(true)
  }

  const buttonClickHandler = () => {
    setPhoneFocused(true)

    if (phoneInputSubmit() && passwordInputSubmit()) {

      fetchUserData(_this.current!.phone, _this.current!.password)
        .then((userData: userData ) => {
          OnSuccessLogin(userData);
        })
        .catch((userErroredData: userErroredData) => {
          console.log(["[Exception] User Errored Data", userErroredData]);
          Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.userNotFound"));
        });
        
    }
  }

  const OnSuccessLogin = async (data: any) => {

    dispatch(saveToken({
      token: data.access_token,
      user: data.user
    }));

    navigation.navigate("MainDrawer")
  }

  // ----------

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

  const validateOnGeorgianPhoneCode = () => {

    if (_this.current!.phone.length !== 9) {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.phoneNumberLength"));
      return false;
    }
    else {
      return true;
    }

  }

  const fetchUserData = async (phone_number: string, password: string) => {

      const user = await Ajax.post('/login', {
        phone_number: phone_number,
        password: password
      });

      return user;

  }

  return {
    loading,
    SetLoading,
    phoneInputSubmit,
    passwordTextHandler,
    passwordInputSubmit,
    _this,
    phoneRef,
    onFocus,
    phoneFocused,
    passwordRef,
    t,
    buttonClickHandler
  }
}