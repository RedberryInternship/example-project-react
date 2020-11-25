import { useReducer } from 'react'
/** Contexts */
import ChargerContext from 'hooks/contexts/charger'

/** Reducers */
import chargerReducer from 'hooks/reducers/chargerReducer'

/** Initial states */
import chargerInitialState from 'hooks/initialStates/charger'

/**
 * Set up state using context technology,
 * for whole app, chargers and home screen.
 *
 * @returns {Object}
 */
const createState = () => {
  const [chargerState, chargerDispatch] = useReducer(
    chargerReducer,
    chargerInitialState,
  )
  const chargerContextValue = mapDefaultKeys(chargerState, chargerDispatch)

  return {
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
const mapDefaultKeys = (state: any, dispatch: any) => ({
  state,
  dispatch,
})

export default createState
