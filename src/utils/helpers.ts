/* eslint-disable @typescript-eslint/camelcase */
import { Sentry, Defaults, locationConfig, Helpers } from 'utils'
import { Exception } from '@sentry/react-native'
import {
  ChargerFilters,
  Charger,
  ChargersObject,
  UserSettingEnum,
  ChargingStatus,
  ChargingState,
  ChargingFinishedPopupEnum,
} from '../../@types/allTypes.d'
import i18next from 'i18next'
import services from 'services'
import { Alert, Linking, Platform } from 'react-native'
import { isPermissionGrantedRegex } from './mapAndLocation/mapFunctions'

import { chargingState } from 'hooks/actions/chargerActions'
const Logger = (err: Exception | string | number): void => {
  if (__DEV__) {
    Sentry.captureException(err)
  } else {
    console.log(['Logger', err])
  }
}

const ConvertToChargerFilterParam = (
  filterInput = '',
): object => {
  const param: ChargerFilters = {}
  // if (filterChargerTypes[0] && !filterChargerTypes[1]) param.status = 1
  // if (filterChargerTypes[1] && !filterChargerTypes[0]) param.free = 0

  // if (filterChargerTypes[2] && !filterChargerTypes[3]) param.type = 'fast'
  // if (filterChargerTypes[3] && !filterChargerTypes[2]) param.type = 'level2'

  // if (filterChargerTypes[4] && !filterChargerTypes[5]) param.public = 1
  // if (filterChargerTypes[5] && !filterChargerTypes[4]) param.public = 0
  // if (filterInput !== '') param.text = filterInput
  param.text = filterInput
  // console.log(filterChargerTypes, param, 'filterChargerTypes')
  return param
}

const GetFilteredCharger = async (
  selectedFilters: number[],
  filterInput = '',
): Promise<Charger[] | null> => {
  const params: ChargerFilters = ConvertToChargerFilterParam(
    filterInput,
  )
  if (Object.entries(params).length !== 0) {
    try {
      const { data }: ChargersObject = await services.getAllChargersFiltered()
      if (filterInput !== "") {
        return searchChargers(filterInput, data);
      }
      return filterChargers(selectedFilters, data)
    } catch (error) {
      DisplayDropdownWithError()
    }
  }
  return null
}

const searchChargers = (text: string, data: Charger[]) => {
  const list = data.filter(charger => {
    const string = JSON.stringify(charger);
    if (string.toLowerCase().includes(text.toLowerCase())) {
      return true;
    }
    return false;
  });
  return list;
}

const filterChargers = (selectedFilters: number[], data: Charger[]) => {
  let showAll = true;
  if (selectedFilters.length) {
    showAll = selectedFilters.indexOf(1) > -1 ? false : true;
  }
  return data.filter((charger, index) => {
    if (selectedFilters[0] && charger.status === 'ACTIVE') {
      return true;
    }
    if (selectedFilters[1] && charger.status === 'CHARGING') {
      return true;
    }
    if (selectedFilters[2] && charger.connector_types?.length > 0 &&
      (charger.connector_types[0]?.name === 'Combo 2' || charger.connector_types[0]?.name === 'Chademo')) {
      return true;
    }
    if (selectedFilters[3] && charger.connector_types?.length > 0 && charger.connector_types[0]?.name === 'Type 2') {
      return true;
    }
    if (selectedFilters[4] && charger?.public == 1) {
      return true;
    }
    if (selectedFilters[5] && charger?.public == 0) {
      return true;
    }
    return showAll;
  })
}

const DisplayDropdownWithError = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  Defaults.dropdown?.alertWithType(
    'error',
    i18next.t(title ?? 'dropDownAlert.generalError'),
    i18next.t(text ?? ''),
  )
}

const DisplayDropdownWithSuccess = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {
  Defaults.dropdown?.alertWithType(
    'success',
    i18next.t(title ?? 'dropDownAlert.generalSuccess'),
    i18next.t(text ?? ''),
  )
}

const isAuthenticated = (): boolean => !!Defaults.token

type UserColumnType =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone_number'
  | 'mapMode'

const getUserSendDataAndType = (
  data: Record<string, string>,
  type: UserSettingEnum,
) => {
  let objectKey: UserColumnType = 'first_name'
  const sendData: any = {}
  switch (type) {
    case UserSettingEnum.firstName:
      objectKey = 'first_name'
      break
    case UserSettingEnum.lastName:
      objectKey = 'last_name'
      break

    case UserSettingEnum.activeCard:
      break

    case UserSettingEnum.email:
      break

    case UserSettingEnum.phone:
      break
    case UserSettingEnum.password:
      break
  }
  sendData[objectKey] = data[type]

  return {
    sendData,
    objectKey,
  }
}

const onLocationAccessDenied = (cb?: (status: boolean) => void) => {
  Alert.alert(
    i18next.t('needLocation'),
    i18next.t('locationIsDenied'),
    [
      {
        text: i18next.t('navigateToSettings'),
        onPress: () => {
          cb?.(true)
          Linking.openURL('app-settings:path=LOCATION')
        },
      },
      {
        text: i18next.t('no'),
        onPress: () => {
          cb?.(false)
        },
        style: 'destructive',
      },
    ],
    { cancelable: true },
  )
}
type EasyAlert = Partial<{
  title: string
  text: string
  rightText: string
  leftText: string
  onRightClick: () => void
  onLeftClick: () => void
}>

const easyAlert = ({
  title,
  text,
  rightText,
  leftText,
  onRightClick,
  onLeftClick,
}: EasyAlert) => {
  Alert.alert(
    i18next.t(title ?? ''),
    i18next.t(text ?? ''),
    [
      {
        text: i18next.t(leftText ?? ''),
        onPress: onLeftClick,
      },
      {
        text: i18next.t(rightText ?? 'no'),
        onPress: onRightClick,
        style: 'destructive',
      },
    ],
    { cancelable: true },
  )
}

const getAndRequestLocation = async (): Promise<boolean> => {
  if (
    !isPermissionGrantedRegex(Defaults.locationPermissionStatus) &&
    Platform.OS === 'ios'
  ) {
    onLocationAccessDenied()
    return true
  } else if (!isPermissionGrantedRegex(Defaults.locationPermissionStatus)) {
    const status = await locationConfig.requestPermission()

    if (!status) return false
  }
  return true
}

const onModalClose = (dispatch: any) => {
  // NavigationActions.navigate('Home')
  chargingState(dispatch)
}

const configureChargingFinishPopup = (
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
    console.log("CH_STAT:", charging_status);
    switch (charging_status) {
      case ChargingStatus.CHARGED:
        //TODO: On every case there should be if statement that checks if charging type is full or by amount
        // for now left this and default is full charge
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
            bottomDescription: charger_type === 'LVL2' ? 'popup.yourChargingOnFineStarted' : 'popup.automobileChargingFinished',
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
        break;
      case ChargingStatus.ON_HOLD:
        Helpers.DisplayDropdownWithError('dropDownAlert.connectionProblem')
        return;
    }
    setTimeout(() => {
      console.log(['შემოდის აქ', charging_status, options]);

      Defaults.modal.current?.customUpdate(true, options)
    }, 1000)
  }
}
export default {
  Logger,
  ConvertToChargerFilterParam,
  GetFilteredCharger,
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
  isAuthenticated,
  getUserSendDataAndType,
  onLocationAccessDenied,
  getAndRequestLocation,
  configureChargingFinishPopup,
  easyAlert,
}
