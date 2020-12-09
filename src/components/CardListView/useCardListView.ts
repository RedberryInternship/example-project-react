import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import { refreshUserData } from 'state/actions/userActions'
import services from 'services'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'

const useCardListView = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const updateUserHandler = async (val) => {
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
    user,
  }
}

export default useCardListView
