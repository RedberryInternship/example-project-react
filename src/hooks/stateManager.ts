import { useReducer } from 'react'
/** Contexts */
import AppContext from 'hooks/contexts/app'
import HomeContext from 'hooks/contexts/home'
import ChargerContext from 'hooks/contexts/charger'

/** Reducers */
import rootReducer from 'hooks/reducers/rootReducer'
import homeReducers from 'hooks/reducers/homeReducers'
import chargerReducer from 'hooks/reducers/chargerReducer'

/** Initial states */
import appInitialState from 'hooks/initialStates/app'
import homeInitialState from 'hooks/initialStates/home'
import chargerInitialState from 'hooks/initialStates/charger'

/**
 * Set up state using context technology,
 * for whole app, chargers and home screen.
 *
 * @returns {Object}
 */
const createState = () => {
  const [appState, appDispatch] = useReducer(rootReducer, appInitialState)
  const appContextValue = mapDefaultKeys(appState, appDispatch)

  const [homeState, homeDispatch] = useReducer(homeReducers, homeInitialState)
  const homeContextValue = mapDefaultKeys(homeState, homeDispatch)

  const [chargerState, chargerDispatch] = useReducer(
    chargerReducer,
    chargerInitialState,
  )
  const chargerContextValue = mapDefaultKeys(chargerState, chargerDispatch)

  return {
    HomeContext,
    homeContextValue,
    AppContext,
    appContextValue,
    ChargerContext,
    chargerContextValue,
  }
}

/**
 * Map context state and dispatch
 * in new object for naming purposes.
 *
 * @param state
 * @param dispatch
 *
 * @returns {Object}
 */
const mapDefaultKeys = (state: any, dispatch: any) => {
  return {
    state: state,
    dispatch: dispatch,
  }
}

export default createState
