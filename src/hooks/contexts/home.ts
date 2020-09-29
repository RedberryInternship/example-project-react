import { createContext } from 'react'
import { HomeContextType } from 'allTypes'

export default createContext<HomeContextType>({
  state: null,
  dispatch: null,
})
