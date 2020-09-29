import { useState, useContext } from 'react'
import {
  DisplayDropdownWithError,
  DisplayDropdownWithSuccess,
} from 'helpers/inform'
import { Navigation, AppContextType } from 'allTypes'
import AppContext from 'hooks/contexts/app'
import { editUserInfo } from 'hooks/actions/rootActions'

export default (navigation: Navigation) => {
  const { dispatch, state }: AppContextType = useContext(AppContext)
  const [activeAvatar, setActiveAvatar] = useState<number | undefined>( // Vobi Todo: why is avatar number
    state?.user?.avatar,
  )

  const updateAvatar = async () => {
    try {
      navigation.navigate('Home')
      editUserInfo(dispatch, activeAvatar, 'avatar')
      DisplayDropdownWithSuccess('dropDownAlert.avatarUpdatedSuccessfully')
    } catch (err) {
      DisplayDropdownWithError()
    }
  }
  const onAvatarPress = (index: number): void => {
    if (index === activeAvatar) setActiveAvatar(undefined)
    else setActiveAvatar(index)
  }

  return {
    activeAvatar,
    setActiveAvatar,
    updateAvatar,
    onAvatarPress,
  }
}
