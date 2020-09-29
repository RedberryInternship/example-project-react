import { createContext } from 'react'
import { AppContextType } from 'allTypes.d'

export default createContext<AppContextType>({
  state: null,
  dispatch: null,
})
