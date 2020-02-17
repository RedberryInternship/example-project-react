import {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import { useTranslation } from 'react-i18next';

// utils
import {
  Defaults,
  Ajax,
  apiServices
} from '../../utils';


import { AppContext } from '../../../App';
import { editUserInfo } from '../actions/rootActions';


export default (navigation: any, clicked: boolean, setClicked: any) => {

  const { t } = useTranslation();
  const { dispatch } = useContext(AppContext);
  const phoneInputRef: any = useRef(null);
  const codeRef: any = useRef();
  const [recieveCodeButtonClicked, setRecieveCodeButtonClicked] = useState<boolean>(false);
  const _this = useRef({
    phone: navigation.getParam('value'),
    code: ''
  });

  useEffect(() => {
    phoneInputRef!.current!.setNativeProps({
      text: navigation.getParam('value').slice(4)
    });
    phoneInputRef!.current!.focus();

  }, []);

  useEffect(() => {
    if (clicked === true) {
      savePhoneNumber();
      setClicked(false);
    }
  }, [clicked])

  const savePhoneNumber = () => {
    validate.isCodeValid() && helpers.tryVerifyingSmsCodeWithUpdateUserPhone();
  }

  // phone handlers
  const onSubmit = () => {
    savePhoneNumber();
  }


  // Receive Code Handlers
  const receiveCodeTextHandler = (text: string) => {

    if (text.length > 4) {
      codeRef.current.setNativeProps({
        text: _this.current.code
      });
      return;
    }
    _this.current.code = text.trim();
  }

  const receiveCodeOnSubmit = () => {
    recieveCode();
  }

  const recieveCode = () => {
    if (validate.isPhoneNumberValid()) {

      helpers.tryRequestingSmsCode();
    }
  }

  const validate = {
    isPhoneNumberValid: () => {
      if (validate.isPhoneEmpty()) {
        return false;
      }

      if (validate.isPhoneNumberGeorgian()) {
        return validate.isGeorgianPhoneNumberValid();
      }
      else {
        return true;
      }
    },

    isPhoneEmpty: () => {
      return _this.current.phone.trim() === '';
    },

    isGeorgianPhoneNumberValid: () => {
      if (_this.current!.phone.length < 5) {
        helpers.popAlert('dropDownAlert.registration.fillPhoneNumber');
        return false;
      }
      else if (_this.current!.phone.length - 4 !== 9) {
        helpers.popAlert('dropDownAlert.auth.phoneNumberLength');
        return false;
      }
      else {
        return true;
      }
    },
    isPhoneNumberGeorgian: () => {
      return _this.current.phone.slice(0, 4) === '+995';
    },
    isCodeValid: (): boolean => {
      if (_this.current.code.length === 0) {
        helpers.popAlert('dropDownAlert.forgotPassword.fillCode');
        codeRef.current.focus();
        return false;
      }
      else if (_this.current.code.length !== 4) {
        helpers.popAlert('dropDownAlert.forgotPassword.smsCodeLength');
        codeRef.current.focus();
        return false;
      }

      return true;
    }
  }


  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error') => {
      Defaults.dropdown.alertWithType(type, t(text));
    },
    tryRequestingSmsCode: async () => {
      try {
        const dataToSend = { phone_number: _this.current.phone };

        const result = await Ajax.post(apiServices.post_send_sms_code, dataToSend);

        if (result) {
          helpers.popAlert('dropDownAlert.registration.codeSentSuccessfully', 'success');
          codeRef!.current!.startCodeAnimation();
          setRecieveCodeButtonClicked(true);
        }
      }
      catch (e) {
        helpers.popAlert('dropDownAlert.generalError');
      }
    },


    tryVerifyingSmsCodeWithUpdateUserPhone: async () => {
      try {

        const dataToSend = {
          phone_number: _this.current.phone,
          code: _this.current.code
        };

        const result = await Ajax.post(apiServices.post_verify_code, dataToSend);

        if (result.status === 200) {
          helpers.updateUserInfo();
        }
        else{
          helpers.popAlert('dropDownAlert.generalError');
        }
      }
      catch (e) {
        switch (e.status) {

          case 401:
            helpers.popAlert('dropDownAlert.registration.incorrectCode');
            return;

          case 409:
            helpers.popAlert('dropDownAlert.editPhoneNumber.phoneTaken');
            return;

          case 440:
            helpers.popAlert('dropDownAlert.forgotPassword.smsCodeExpired');
            return;

          default:
            helpers.popAlert('dropDownAlert.generalError');
        }
      }
    },

    updateUserInfo: async () => {

      try {
        const dataToSend = {
          phone_number: _this.current.phone
        };
        const result = await Ajax.post(apiServices.post_update_user_info, dataToSend);

        if (result.updated) {
          helpers.popAlert('dropDownAlert.editPhoneNumber.success', 'success');
          editUserInfo(dispatch, _this.current.phone, 'phone_number');
          navigation.goBack();
        }
        else {
          helpers.popAlert('dropDownAlert.generalError');
        }
      }
      catch (e) {
        helpers.popAlert('dropDownAlert.generalError');
      }

    }
  }


  return {
    _this,
    onSubmit,
    phoneInputRef,
    codeRef,
    receiveCodeTextHandler,
    receiveCodeOnSubmit,
    recieveCode,
    recieveCodeButtonClicked
  };
}