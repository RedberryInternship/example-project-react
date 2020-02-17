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
  const [firstname, setFirstname] = useState(navigation.getParam('value'));
  const firstnameInputRef: any = useRef(null);

  
  // when clicked on save button, save hook released.
  useEffect(() => {
    if (clicked === true) {
      saveFirstname();
    }

  }, [clicked])


  const saveFirstname = () => {

    if (validate.isEmpty()) {
      setClicked(false);
      helpers.makeFirstnameFieldEmpty();
      helpers.popAlert('dropDownAlert.editFirstname.firstNameNotEmpty');
      return;
    }

    if (validate.isLessThenMinSize()) {
      setClicked(false);
      helpers.makeFirstnameFieldEmpty();
      helpers.popAlert('dropDownAlert.editFirstname.minSize');
      return;
    }

    helpers.sendFirstnameToSave()
      .then(data => {
        if (data.updated === true) {
          helpers.goToSettingsScreen();
          helpers.popAlert('dropDownAlert.editFirstname.firstNameChangeSucess', 'success');
          editUserInfo(dispatch, firstname, 'first_name');
        }
        else {
          helpers.popAlert('dropDownAlert.generalError');
        }
      });
  }


  const onChangeText = (text: string) => {
    setFirstname(text);
  }

  const onSubmitEditing = () => {
    saveFirstname();
  }

  // validations
  const validate = {
    isEmpty: (): boolean => {
      if (firstname.trim() === '') {
        return true;
      }
      else {
        return false;
      }
    },
    isLessThenMinSize: (): boolean => {
      if (firstname.trim().length < 3) {

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
    makeFirstnameFieldEmpty: () => {
      setFirstname('');
    },
    sendFirstnameToSave: async () => {
      try {
        return await Ajax.post(apiServices.post_update_user_info, { first_name: firstname });
      }
      catch (err) {
        helpers.popAlert('dropDownAlert.generalError');
      }
    },
    goToSettingsScreen: () => {
      // TODO: Navigation Go Back Properly
      navigation.goBack();
    }
  }

  return {
    onChangeText,
    onSubmitEditing,
    firstnameInputRef,
    firstname  
  };
}