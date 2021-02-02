import { useNavigationState } from '@react-navigation/native'
import { useEffect, useState } from 'react'

type NavigationState = {
  index?: number
  routes?: any[]
  name?: string
  state?: NavigationState
}

const dfs = (state: NavigationState): any => {
  if ('index' in state && 'routes' in state) {
    return dfs(state.routes![state.index!])
  }
  if ('state' in state) {
    return dfs(state.state!)
  }

  return state.name!
}

const useCurrentRoute = () => {
  const [route, setRoute] = useState('Home')
  const state = useNavigationState((state) => state)

  useEffect(() => {
    setRoute(dfs(state))
  }, [state])

  return route
}

export default useCurrentRoute
