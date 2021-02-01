import { combineReducers } from 'redux'
import chargingProcessReducer from 'state/reducer/chargingProcessReducer'
import userReducer from 'state/reducer/userReducer'
import homeReducer from 'state/reducer/homeReducer'
import appReducer from 'state/reducer/appReducer'

export default combineReducers(
  {
    chargingProcess: chargingProcessReducer,
    user: userReducer,
    home: homeReducer,
    app: appReducer,
  },
)
