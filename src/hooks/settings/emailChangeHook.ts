import {
  useState,
  useEffect,
  useRef,
  useContext
} from 'react';

import { AppContext } from '../../../App';
import { Defaults, Ajax, apiServices } from '../../utils';
import { editUserInfo } from '../../hooks/actions/rootActions';
import { useTranslation } from 'react-i18next';

export default (navigation: any, clicked: boolean, setClicked: any) => {


  const [email, setEmail] = useState(navigation.getParam('value'));
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const emailInputRef = useRef(null);

  // When User Clicks Save Btn
  useEffect(()=> {
    if(clicked === true){
      saveEmail();
    }
  }, [clicked]);


  const saveEmail = () => {


    // If Empty => save email
    if(validate.isEmailEmpty()){
      helpers.sendRequestToSaveEmail()
        .then(data => {
          if (data.updated === true) {
            editUserInfo(dispatch, email.trim(), 'email');
            helpers.goToSettingsScreen();
            helpers.popAlert('dropDownAlert.editEmail.editedSuccssesfully');
          }
          else {
            helpers.popAlert('dropDownAlert.generalError');
            setClicked(false);
          }
        });
    }
    // False => check email validity
    else{

      if(validate.isEmailValid()){
        
        helpers.sendRequestToSaveEmail()
          .then(data => {
            if(data.updated){
              editUserInfo(dispatch, email.trim(), 'email');
              helpers.goToSettingsScreen();
              helpers.popAlert('dropDownAlert.editEmail.editedSuccssesfully','success');
            }
          });

      }
      else{
        helpers.popAlert('dropDownAlert.editEmail.incorrectFormat','error');
        helpers.emptyEmailField();
        setClicked(false);
      }
    }
  }

  const onChangeText = (text: string) => {
    setEmail(text);
  }

  const onSubmit = () => {
    saveEmail();
  }



  // validation
  const validate = {

    isEmailEmpty: (): boolean => {
      return email.trim() === '';
    },

    isEmailValid: (): boolean => {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(email.trim());
    }
  }


  // helpers
  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error') => {    
      Defaults.dropdown.alertWithType(type, t(text));
    },

    sendRequestToSaveEmail: async () => {
      try{
        return await Ajax.post(apiServices.post_update_user_info, {email: email});
      }
      catch(err) {
        console.log(['Email-Send-Request-To-Save',err]);
        helpers.emptyEmailField();
      }
    },

    emptyEmailField: () => {
      setEmail('');
    },

    goToSettingsScreen: () => {
      navigation.goBack();
    }
  }

  return {
    email,
    onChangeText,
    onSubmit,
    emailInputRef
  };
};