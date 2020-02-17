import { useRoot } from './rootRun'
import useMap from './mapViewHook'
import useLocation from './locationHook'
import useHomeHook from './homeHook'
import useHomeMainInputHook from './homeMainInputHook'

//authentication
import useAuthHook from './authentication/authHook'
import useForgotPassword from './authentication/forgotPassword'
import useRegistrationHook from './authentication/registration/registrationHook'
import useSetNewPasswords from './authentication/setNewPasswords'

//charger
import useChargerWithCode from './charger/chargerWithCode'
import useChoosingCard from './charger/choosingCard'
import useChargingHook from './charger/chargingHook'
import useChargerDetails from './charger/chargerDetails'


// UserInfo
import useFirstnameChange from './settings/firstnameChangeHook';
import useLastnameChange from './settings/lastnameChangeHook';
import useEmailChange from './settings/emailChangeHook';
import usePhoneChange from './settings/phoneChangeHook';
import usePasswordChange from './settings/changePasswordHook';

//reducer
import rootReducer, { initialState } from './reducers/rootReducer'



export {
  useRoot,
  useMap,
  useLocation,
  useHomeHook,
  useHomeMainInputHook,
  useAuthHook,
  useForgotPassword,
  useRegistrationHook,
  useSetNewPasswords,
  useChargerWithCode,
  useChoosingCard,
  rootReducer,
  initialState,
  useChargingHook,
  useChargerDetails,
  useFirstnameChange,
  useLastnameChange,
  useEmailChange,
  usePhoneChange,
  usePasswordChange
}