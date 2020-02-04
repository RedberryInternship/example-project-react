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
  const phoneRef: any = useRef(null);
  const passwordRef: any = useRef(null);

  const { t } = useTranslation();
  const _this: RefObject<_This> = useRef({ password: "", phone: '' })

  const phoneTextHandler = (val: string) => _this.current!.phone = val;

  const passwordTextHandler = (val: string) => _this.current!.password = val;

  const buttonClickHandler = () => {
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


  const phoneInputSubmit = () => {

    if (validate.isSelectedCountryCodeGeorgian()) {

      const isPhoneValidationSuccessful = validate.validateOnGeorgianPhoneCode();

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

  const passwordInputSubmit = () => {
    if (_this.current!.password === "") {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.passworNotEmpty"));
      return false;
    }
    else {
      return true;
    }
  }

  const OnSuccessLogin = async (data: any) => {

    dispatch(saveToken({
      token: data.access_token,
      user: data.user
    }));

    navigation.navigate("MainDrawer")
  }



  const fetchUserData = async (phone_number: string, password: string) => {

      const user = await Ajax.post('/login', {
        phone_number: phone_number,
        password: password
      });

      return user;
  }


  // Validate
  const validate = {
    validateOnGeorgianPhoneCode: () => {

      if (_this.current!.phone.length < 5) {
        Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.fillPhoneNumber"));
        return false;
      }
      else if (_this.current!.phone.length - 4 !== 9) {
        Defaults.dropdown.alertWithType("error", t("dropDownAlert.auth.phoneNumberLength"));
        return false;
      }
      else {
        return true;
      }
    },

    isSelectedCountryCodeGeorgian: ():boolean =>{
      return _this.current!.phone.slice(0,4) === '+995';
    }
  }

  return {
    loading,
    SetLoading,
    phoneTextHandler,
    phoneInputSubmit,
    passwordTextHandler,
    passwordInputSubmit,
    _this,
    phoneRef,
    passwordRef,
    t,
    buttonClickHandler
  }
}