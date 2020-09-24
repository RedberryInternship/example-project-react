import { createContext } from 'react'
import { AppContextType } from '@types/allTypes'

export default createContext<AppContextType>(
  {
    state: null,
    dispatch: null
  }
)