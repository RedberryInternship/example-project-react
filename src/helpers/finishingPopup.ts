/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import defaults from 'utils/defaults'
import { refreshChargingProcesses } from 'state/actions/chargingProcessActions'
import { DisplayDropdownWithError } from 'utils/inform'
import {
  ChargingFinishedPopupEnum,
  ChargingStatus,
  ChargingState,
} from 'types'
import references from 'utils/references'
import { CommonActions } from '@react-navigation/native'

const configureChargingFinishPopup = (
  {
    penalty_start_time,
    charging_status,
    penalty_enabled,
    consumed_money,
    already_paid,
    charger_type,
    refund_money,
    is_free,
  }: ChargingState,
) => {
  const { navigator, reduxDispatch: dispatch } = references
  if (charging_status === ChargingStatus.UNPLUGGED) {
    DisplayDropdownWithError('dropDownAlert.pleaseSeeIfChargerIsConnected')
    return
  }

  if (
    charging_status !== ChargingStatus.INITIATED
    && charging_status !== ChargingStatus.CHARGING
    && charging_status !== ChargingStatus.NOT_CONFIRMED
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
        is_free,
      },
      onCloseClick: () => {
        dispatch && dispatch(refreshChargingProcesses())
      },
    }

    switch (charging_status) {
      case ChargingStatus.CHARGED:

        options = {
          ...options,
          subType: ChargingFinishedPopupEnum.LVL2FullCharge,
          data: {
            ...options.data,
            bottomDescription: penalty_enabled
              ? 'popup.warningTextBeforeFine'
              : 'popup.chargingFinishedPleaseUnplug',
            onFine: false,
            onFinish: () => dispatch && dispatch(refreshChargingProcesses()),
            penalty_enabled,
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
        let subType = 0
        let bottomDescription = ''
        if (charger_type === 'LVL2') {
          subType = ChargingFinishedPopupEnum.LVL2FullCharge

          bottomDescription = penalty_enabled
            ? 'popup.chargingFinishedPleaseUnplug'
            : 'popup.yourChargingOnFineStarted'
        } else {
          bottomDescription = 'popup.automobileChargingFinished'
          subType = ChargingFinishedPopupEnum.UsedUpFastProps
        }

        options = {
          ...options,
          subType,
          data: {
            ...options.data,
            bottomDescription,
            chargerTypeFAST: charger_type === 'LVL2',
            price: already_paid,
            penalty_enabled,
          },
        }
        break
      case ChargingStatus.FINISHED:
        dispatch && dispatch(refreshChargingProcesses())
        if (defaults.activeRoute === 'Charging') {
          navigator?.dispatch(CommonActions.navigate('HomeTabNavigation', {
            screen: 'Home',
          }))
        }
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
      defaults.modal?.current?.customUpdate(true, options)
    }, 1000)
  }
}

export default configureChargingFinishPopup
