import {useRoot} from './rootRun'
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

//reducer
import rootReducer, {initialState} from './reducers/rootReducer'

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
}
