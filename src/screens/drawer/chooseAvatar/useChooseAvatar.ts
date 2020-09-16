import {useState, useContext} from 'react'

import {Helpers} from 'utils'
import {Navigation, AppContextType} from 'allTypes'
import {AppContext} from '../../../../App'
import {editUserInfo} from 'hooks/actions/rootActions'

export default (navigation: Navigation) => {
  const {dispatch, state}: AppContextType = useContext(AppContext)
  const [activeAvatar, setActiveAvatar] = useState<number | undefined>( // Vobi Todo: why is avatar number
    state.user?.avatar,
  )

  const updateAvatar = async () => {
    try {
      // const result = await services.updateUserInfo({[type]: form[type]})

      // if (result.updated === true) {
      navigation.navigate('Home')
      editUserInfo(dispatch, activeAvatar, 'avatar')
      Helpers.DisplayDropdownWithSuccess(
        'dropDownAlert.avatarUpdatedSuccessfully',
      )
      // } else {
      //   throw new Error('Something Went Wrong...')
      // }
    } catch (err) {
      Helpers.DisplayDropdownWithError()
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
