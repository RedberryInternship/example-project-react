import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import {
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import { Navigation, UserState } from 'allTypes'
import { editUserInfo } from 'state/actions/userActions'
import { setUserData, setUserDetail } from 'helpers/user'

export default (navigation: Navigation) => {
  const state: UserState = useSelector(selectUser)
  const dispatch = useDispatch()

  const [activeAvatar, setActiveAvatar] = useState<number | undefined>(state?.user?.avatar)
  // Vobi: why is avatar number
  // - It is just static image which you can choose
  //   as your avatar

  /**
   * Update avatar.
   */
  const updateAvatar = () => {
    try {
      navigation.navigate('Home')

      setUserDetail('avatar', activeAvatar)
      setUserData()
      dispatch(editUserInfo(activeAvatar, 'avatar'))

      DisplayDropdownWithSuccess('dropDownAlert.avatarUpdatedSuccessfully')
    } catch (err) {
      remoteLogger(err)
      DisplayDropdownWithError()
    }
  }

  /**
   * Select avatar.
   */
  const onAvatarPress = (index: number): void => {
    if (index === activeAvatar) {
      setActiveAvatar(undefined)
    }
    else {
      setActiveAvatar(index)
    }
  }

  return {
    activeAvatar,
    setActiveAvatar,
    updateAvatar,
    onAvatarPress,
  }
}
