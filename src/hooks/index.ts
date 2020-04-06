import {useRoot} from './rootRun'

// UserInfo
import useSettings from './settings/mainHook'
import useFirstnameChange from './settings/firstnameChangeHook'
import useLastnameChange from './settings/lastnameChangeHook'
import useEmailChange from './settings/emailChangeHook'
import usePhoneChange from './settings/phoneChangeHook'
import usePasswordChange from './settings/changePasswordHook'

//reducer
import rootReducer, {initialState} from './reducers/rootReducer'

export {
  useRoot,
  rootReducer,
  initialState,
  useFirstnameChange,
  useLastnameChange,
  useEmailChange,
  usePhoneChange,
  usePasswordChange,
  useSettings,
}
