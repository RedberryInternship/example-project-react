import { easyAlert } from 'utils/inform'
import { UserSettingEnum } from 'types/enums'
import { CommonActions } from '@react-navigation/native'
import references from 'utils/references'

export const youCanAddCar = (t: any) => {
  const { navigator } = references
  easyAlert(
    {
      title: t('dropDownAlert.addCar.youCanAddCar'),
      rightText: t('yes'),
      leftText: t('no'),
      onRightClick: () => {
        navigator?.dispatch(CommonActions.navigate('DrawerMenuOptions', {
          screen: 'ProfileChange',
          params: {
            type: UserSettingEnum.addCar,
          },
        }))
      },
      onLeftClick: () => { },
    },
  )
}
