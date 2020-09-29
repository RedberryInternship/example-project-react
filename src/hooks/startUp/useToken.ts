import { useState, useContext } from 'react'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { UserMeResponseType } from 'allTypes'
import { rootAction } from 'hooks/actions/rootActions'
import AppContext from 'hooks/contexts/app'

const useToken = () => {
  const { dispatch } = useContext(AppContext)

  const [token, setToken] = useState<null | string>('')
  const { getItem: getUserDetail, setItem: setUserDetail } = useAsyncStorage(
    'userDetail',
  )
  const { getItem, setItem } = useAsyncStorage('token')

  const readUserToken = async (): Promise<void> => {
    const token = await getItem()
    let user: UserMeResponseType = null
    if (token) {
      const parsableData = await getUserDetail()
      user = parsableData != null ? JSON.parse(parsableData) : ''
    }

    rootAction({ token: token ?? '', user }, dispatch)
    setToken(token)
  }

  return {
    readUserToken,
    token,
  }
}

export default useToken
