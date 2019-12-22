import {useState,useRef} from "react";
import {Alert} from "react-native"
import {useTranslation} from 'react-i18next';

type _This = {
  newPassword : string,
  repeatPassword : string,
}

export default () => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const newPasswordRef : any = useRef(null);
  const repeatPasswordRef : any = useRef(null);

  const { t} = useTranslation();

  const _this  = useRef<_This>({ newPassword : "", repeatPassword:"" })


  const newPasswordTextHandler = (val : string) => {
    newPasswordRef.current.setNativeProps({
      password : val
    })
    _this.current.newPassword = val;
    // Ajax.get()
  }

  const newPasswordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  
  const repeatPasswordTextHandler = (val : string) => {
    repeatPasswordRef.current.setNativeProps({
      password : val
    })
    _this.current.repeatPassword = val;
    // Ajax.get()
  }

  const repeatPasswordInputSubmit = () => {
    Alert.alert(JSON.stringify(_this.current))
  }

  return {
      loading, SetLoading, newPasswordTextHandler,newPasswordInputSubmit,
      repeatPasswordTextHandler,repeatPasswordInputSubmit, _this,
      t, newPasswordRef, repeatPasswordRef
    }
}