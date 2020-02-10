import { 
  useRef,
  useEffect
} from 'react';



import { useTranslation } from 'react-i18next';


// utils
import { Defaults } from '../../utils';


export default (navigation : any, clicked: boolean, setClicked: any) => {

  const { t } = useTranslation();

  const phoneInputRef = useRef(null);
  const codeRef = useRef();  
  const _this = useRef({
    phone: navigation.getParam('value').slice(4),
    code: ''
  });

  useEffect(() => {
  phoneInputRef!.current!.setNativeProps({
    text: _this.current.phone
  });
   phoneInputRef!.current!.focus(); 
  },[]);

  useEffect(() => {
    if(clicked === true){
      savePhoneNumber();
      setClicked(false);
    }
  },[clicked])

  const savePhoneNumber = () => {

    
  }

  // phone handlers
  const onSubmit = () => {
    savePhoneNumber();
  }


  // Receive Code Handlers

  const receiveCodeTextHandler = (text: string) => {
    if(text.length > 4){
      return;
    }
    _this.current.code = text;
  }

  const receiveCodeOnSubmit = () => {
    recieveCode();
  }

  const recieveCode = () => {
    console.log(_this);
    if(validate.isPhoneNumberValid()){
      // TODO: Send Request
      codeRef!.current!.startCodeAnimation();
    }
  }

  const validate = {
    isPhoneNumberValid: () => {
      if(validate.isPhoneEmpty()){
        return false;
      }

      if(validate.isPhoneNumberGeorgian()){
        return validate.isGeorgianPhoneNumberValid();
      }
      else{
        return true;
      }
    },
    isPhoneEmpty: () => {
      return _this.current.phone.trim() === '';
    },
    isGeorgianPhoneNumberValid: () => {
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
    isPhoneNumberGeorgian: () => {
      return _this.current.phone.slice(0,4) === '+995';
    }
  }


  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error') => {    
      Defaults.dropdown.alertWithType(type, t(text));
    },
  }


  return {
    onSubmit,
    phoneInputRef,
    _this,
    codeRef,
    receiveCodeTextHandler,
    receiveCodeOnSubmit,
    recieveCode
  };
}