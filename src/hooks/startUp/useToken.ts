import { useState } from 'react'
import { useAsyncStorage } from '@react-native-community/async-storage'
import { saveUserAndRefresh } from 'state/actions/userActions'
import { UserMeResponseType } from 'allTypes'
import { useDispatch } from 'react-redux'

const useToken = () => {
  const dispatch = useDispatch()

  const [token, setToken] = useState<null | string>('')
  const { getItem: getUserDetail } = useAsyncStorage('userDetail')
  const { getItem } = useAsyncStorage('token')

  const readUserToken = async (): Promise<void> => {
    const fetchedToken = await getItem()

    let user: UserMeResponseType = null
    if (fetchedToken) {
      const parsableData = await getUserDetail()
      user = parsableData != null ? JSON.parse(parsableData) : ''
    }

    dispatch(saveUserAndRefresh(user, fetchedToken))
    setToken(fetchedToken)
  }

  return {
    readUserToken,
    token,
  }
}

export default useToken
