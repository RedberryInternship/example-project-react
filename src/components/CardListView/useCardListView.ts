import { useDispatch } from 'react-redux'
import { refreshUserData } from 'state/actions/userActions'
import services from 'services'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'utils/inform'
import { UserCard } from 'types'

const useCardListView = () => {
  const dispatch = useDispatch()

  const updateUserHandler = async (val: UserCard) => {
    try {
      val && (await services.setDefaultCard(val.id))
      dispatch(refreshUserData())
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  return {
    updateUserHandler,
  }
}

export default useCardListView
