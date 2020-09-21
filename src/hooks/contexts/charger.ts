import { createContext, Dispatch } from 'react'
import { ChargerAction } from 'hooks/actions/chargerActions'
import { chargerInitialState } from 'hooks/reducers/chargerReducer'
import { ChargerState } from 'allTypes'

export default createContext<{
  state: ChargerState
  dispatch: Dispatch<ChargerAction>
}>({ state: chargerInitialState, dispatch: () => null })
