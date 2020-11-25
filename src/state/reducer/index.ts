import { combineReducers } from 'redux'
import userReducer from 'state/reducer/userReducer'
import homeReducer from 'state/reducer/homeReducer'

export default combineReducers({
  user: userReducer,
  home: homeReducer,
})
