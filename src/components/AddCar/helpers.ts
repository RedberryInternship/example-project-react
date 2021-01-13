import { easyAlert } from 'utils/inform'
import { TFunction } from 'react-i18next'

export const onConfirm = (remove: () => void, t: TFunction) => {
  easyAlert({
    title: t('dropDownAlert.addCar.uSureToDelete'),
    rightText: t('yes'),
    leftText: t('no'),
    onRightClick: remove,
    onLeftClick: () => { },
  })
}
