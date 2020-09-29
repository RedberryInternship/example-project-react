import Defaults from 'utils/defaults'
import {
  ChargingStatus,
  ChargingState,
  ChargingFinishedPopupEnum,
} from '../../@types/allTypes.d'
import { chargingState } from 'hooks/actions/chargerActions'
import { DisplayDropdownWithError } from 'helpers/inform'

const onModalClose = (dispatch: any) => {
  chargingState(dispatch)
}

export const configureChargingFinishPopup = (
  {
    charging_status,
    already_paid,
    penalty_start_time,
    charger_type,
    refund_money,
    consumed_money,
    charging_type,
    is_free,
  }: ChargingState,
  dispatch: any,
) => {
  if (charging_status === ChargingStatus.UNPLUGGED) {
    DisplayDropdownWithError('dropDownAlert.pleaseSeeIfChargerIsConnected')
    return
  }

  if (
    charging_status !== ChargingStatus.INITIATED &&
    charging_status !== ChargingStatus.CHARGING &&
    charging_status !== ChargingStatus.NOT_CONFIRMED
  ) {
    let options: any = {
      type: 3,
      subType: ChargingFinishedPopupEnum.LVL2FullCharge,
      data: {
        title: 'popup.thankYou',
        description: 'popup.automobileChargingFinished',
        bottomDescription: 'popup.finishedChargingOfAutomobile',
        price: already_paid,
        time: penalty_start_time,
        consumedMoney: consumed_money,
        refundMoney: refund_money,
        is_free: is_free,
      },
      onCloseClick: () => onModalClose(dispatch),
    }
    console.log('CH_STAT:', charging_status)
    switch (charging_status) {
      case ChargingStatus.CHARGED:
        options = {
          ...options,
          subType: ChargingFinishedPopupEnum.LVL2FullCharge,
          data: {
            ...options.data,
            bottomDescription: 'popup.warningTextBeforeFine',
            onFine: false,
            onFinish: () => {
              chargingState(dispatch)
            },
          },
        }
        break
      case ChargingStatus.ON_FINE:
        options = {
          ...options,
          subType: ChargingFinishedPopupEnum.LVL2FullCharge,
          data: {
            ...options.data,
            bottomDescription: 'popup.yourChargingOnFineStarted',
            onFine: true,
          },
        }
        break
      case ChargingStatus.USED_UP:
        options = {
          ...options,
          subType:
            charger_type === 'LVL2'
              ? ChargingFinishedPopupEnum.LVL2FullCharge
              : ChargingFinishedPopupEnum.UsedUpFastProps,
          data: {
            ...options.data,
            bottomDescription:
              charger_type === 'LVL2'
                ? 'popup.yourChargingOnFineStarted'
                : 'popup.automobileChargingFinished',
            chargerTypeFAST: charger_type === 'LVL2',
            price: already_paid,
          },
        }
        break
      case ChargingStatus.FINISHED:
        chargingState(dispatch)
        options = {
          ...options,
          subType: ChargingFinishedPopupEnum.FinishedCharging,
          data: {
            ...options.data,
            chargerTypeFAST: charger_type === 'LVL2',
          },
        }
        break
      case ChargingStatus.BANKRUPT:
        options = {
          ...options,
          subType: ChargingFinishedPopupEnum.Bankrupt,
          data: {
            ...options.data,
            bottomDescription: 'popup.bankrupt',
            chargerTypeFAST: charger_type === 'LVL2',
            price: already_paid,
          },
        }
        break
      case ChargingStatus.PAYMENT_FAILED:
        options = {
          ...options,
          subType: ChargingFinishedPopupEnum.PaymentFailed,
          data: {
            ...options.data,
            bottomDescription: 'popup.processFailed',
            chargerTypeFAST: charger_type === 'LVL2',
            price: already_paid,
          },
        }
        break
      case ChargingStatus.ON_HOLD:
        DisplayDropdownWithError('dropDownAlert.connectionProblem')
        return
    }
    setTimeout(() => {
      Defaults.modal.current?.customUpdate(true, options)
    }, 1000)
  }
}
