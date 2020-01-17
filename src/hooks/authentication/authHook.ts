/* eslint-disable no-unused-vars */
import {useState,useRef, RefObject} from "react";
import { Alert, } from "react-native"
import {useTranslation} from 'react-i18next';
import { Defaults } from "../../../src/utils";
import { useAsyncStorage } from "@react-native-community/async-storage";


type _This = {
  password: string, 
  phone : string
}

export default (navigation : any ) => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [phoneFocused, setPhoneFocused] = useState<any>(false);
  const phoneRef : any = useRef(null);
  const passwordRef : any = useRef(null);

  const { t } = useTranslation();


  const { setItem : setToken} = useAsyncStorage("token")
  const { setItem : setUserDetail} = useAsyncStorage("userDetail")

  
  const _this : RefObject<_This> = useRef({password:"", phone : ''})


  const phoneTextHandler = (val : string) => {
    phoneRef.current.setNativeProps({
      phone : val
    })

    _this.current!.phone = val; 
  }

  const phoneInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const passwordTextHandler = (val : string) => {
    passwordRef.current.setNativeProps({
      password : val
    })
    _this.current!.password = val;
  }

  const passwordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  const onFocus = () => {
    setPhoneFocused(true)
  }

  const buttonClickHandler = () => {
    setPhoneFocused(true)
    // Ajax.post()

    // OnSuccessLogin()
  }

  const OnSuccessLogin = async (data : any) => {

    Defaults.token = data.token
    Defaults.userDetail = data.user

    await setToken(data.token)
    await setUserDetail(JSON.stringify(data.user) )

    navigation.navigate("MainDrawer")
  }

  return {loading, SetLoading, phoneTextHandler, phoneInputSubmit,passwordTextHandler,passwordInputSubmit, _this, phoneRef, onFocus, phoneFocused, passwordRef, t, buttonClickHandler}
}