import { easyAlert } from 'utils/inform'
import { TFunction } from 'react-i18next'
import Navigation from 'utils/navigation'
import { UserSettingEnum } from 'types/enums'

export const youCanAddCar = (t: TFunction) => {
  easyAlert(
    {
      title: t('dropDownAlert.addCar.youCanAddCar'),
      rightText: t('yes'),
      leftText: t('no'),
      onRightClick: () => {
        Navigation.navigate('ProfileChange', {
          type: UserSettingEnum.addCar,
        })
      },
      onLeftClick: () => { },
    },
  )
}
