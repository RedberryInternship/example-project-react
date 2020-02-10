import {
  useState,
  useRef,
  useContext,
  useEffect
} from 'react';

import { Defaults, apiServices, Ajax } from '../../utils';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../App';
import { editUserInfo } from '../actions/rootActions';


export default (navigation: any, clicked: boolean, setClicked: any) => {

  const { t } = useTranslation();
  const { dispatch } = useContext(AppContext);
  const [lastname, setLastname] = useState(navigation.getParam('value'));
  const lastnameInputRef: any = useRef(null);

  
  // when clicked on save button, save hook released.
  useEffect(() => {
    if (clicked === true) {
      saveLastname();
    }

  }, [clicked])


  const saveLastname = () => {

    if (validate.isEmpty()) {
      setClicked(false);
      helpers.makeLastnameFieldEmpty();
      helpers.popAlert('dropDownAlert.editLastname.lastNameNotEmpty');
      return;
    }

    if (validate.isLessThenMinSize()) {
      setClicked(false);
      helpers.makeLastnameFieldEmpty();
      helpers.popAlert('dropDownAlert.editLastname.minSize');
      return;
    }

    helpers.sendLastnameToSave()
      .then(data => {
        console.log(data);
        if (data.updated === true) {
          helpers.goToSettingsScreen();
          helpers.popAlert('dropDownAlert.editLastname.lastNameChangeSucess', 'success');
          editUserInfo(dispatch, lastname, 'last_name');
        }
        else {
          helpers.popAlert('dropDownAlert.generalError');
        }
      });
  }


  const onChangeText = (text: string) => {
    setLastname(text);
  }

  const onSubmitEditing = () => {
    saveLastname();
  }

  // validations
  const validate = {
    isEmpty: (): boolean => {
      if (lastname.trim() === '') {
        return true;
      }
      else {
        return false;
      }
    },
    isLessThenMinSize: (): boolean => {
      if (lastname.trim().length < 3) {

        setClicked(false);
        return true;
      }
      else {
        return false;
      }
    }
  }

  // helpers
  const helpers = {
    popAlert: (text: string, type: 'success' | 'error' = 'error') => {    
      Defaults.dropdown.alertWithType(type, t(text));
    },
    makeLastnameFieldEmpty: () => {
      setLastname('');
    },
    sendLastnameToSave: async () => {
      try {
        return await Ajax.post(apiServices.post_update_user_info, { last_name: lastname });
      }
      catch (err) {
        console.log(err);
        helpers.popAlert('dropDownAlert.generalError');
      }
    },
    goToSettingsScreen: () => {
      navigation.goBack();
    }
  }

  return {
    onChangeText,
    onSubmitEditing,
    lastnameInputRef,
    lastname
  };
}