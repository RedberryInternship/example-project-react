import { combineReducers } from 'redux'
import chargingProcessReducer from 'state/reducer/chargingProcessReducer'
import userReducer from 'state/reducer/userReducer'
import homeReducer from 'state/reducer/homeReducer'

export default combineReducers(
  {
    chargingProcess: chargingProcessReducer,
    user: userReducer,
    home: homeReducer,
  },
)
