import { useState, useContext } from 'react'
import { DisplayDropdownWithError, DisplayDropdownWithSuccess, remoteLogger } from 'helpers/inform'
import { Navigation, AppContextType } from 'allTypes'
import AppContext from 'hooks/contexts/app'
import { editUserInfo } from 'hooks/actions/rootActions'

export default (navigation: Navigation) => {
  const { dispatch, state }: AppContextType = useContext(AppContext)
  const [activeAvatar, setActiveAvatar] = useState<number | undefined>(state?.user?.avatar) // Vobi Todo: why is avatar number

  const updateAvatar = async () => {
    try {
      navigation.navigate('Home')
      editUserInfo(dispatch, activeAvatar, 'avatar')
      DisplayDropdownWithSuccess('dropDownAlert.avatarUpdatedSuccessfully')
    } catch (err) {
      remoteLogger(err)
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
