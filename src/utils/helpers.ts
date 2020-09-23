/* eslint-disable @typescript-eslint/camelcase */
import locationConfig from 'utils/mapAndLocation/location'
import Defaults from 'utils/defaults'
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
import { isPermissionGrantedRegex } from 'utils/mapAndLocation/permissionsRegex'
import { chargingState } from 'hooks/actions/chargerActions'

const Logger = (data: any): void => {
  if (__DEV__) {
    console.log(data)
  }
}

const ConvertToChargerFilterParam = (
  filterInput = '',
): object => {
  const param: ChargerFilters = {}
  
  param.text = filterInput
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
    let isFree: boolean = false;
    let isBusy: boolean = false;
    let isPublic: boolean = false;
    let isFast: boolean = false;

    if (charger.status === "CHARGING") {
      isBusy = true;
    }

    if (charger.status === "ACTIVE") {
      isFree = true;
    }

    if (charger?.public) {
      isPublic = true;
    }

    if ((charger.connector_types[0]?.name === 'Combo 2' || charger.connector_types[0]?.name === 'Chademo')) {
      isFast = true;
    }


    // //free
    if (isFree && selectedFilters[0]) {
      if (filterByStatus(isFast, isPublic, selectedFilters)) {
        return true;
      }
    }

    //busy
    if (isBusy && selectedFilters[1]) {
      if (filterByStatus(isFast, isPublic, selectedFilters)) {
        return true;
      }
    }

    if (isFast && selectedFilters[2] && selectedFilters[2] && !selectedFilters[0] && !selectedFilters[1]) {
      if (filterByChargerType(isFast, isPublic, selectedFilters)) {
        return true;
      }
    }

    if (!isFast && selectedFilters[3] && !selectedFilters[0] && !selectedFilters[1]) {
      if (filterByChargerType(isFast, isPublic, selectedFilters)) {
        return true;
      }
    }

    if (isPublic && selectedFilters[4] && !selectedFilters[0] && !selectedFilters[1] && !selectedFilters[2] && !selectedFilters[3]) {
      if (filterByChargerAccess(isFast, isPublic, selectedFilters)) {
        return true;
      }
    }

    if (!isPublic && selectedFilters[5] && !selectedFilters[0] && !selectedFilters[1] && !selectedFilters[2] && !selectedFilters[3]) {
      if (filterByChargerAccess(isFast, isPublic, selectedFilters)) {
        return true;
      }
    }

    return showAll;
  })
}

const filterByStatus = (isFast: boolean, isPublic: boolean, selectedFilters: number[]) => {
  if (filterSlowChargers(isFast, isPublic, selectedFilters)) {
    return true;
  }
  if (filterFastChargers(isFast, isPublic, selectedFilters)) {
    return true;
  }
  if (!selectedFilters[2] && !selectedFilters[3] && !selectedFilters[4] && !selectedFilters[5]) {
    return true;
  }
}

const filterByChargerType = (isFast: boolean, isPublic: boolean, selectedFilters: number[]) => {
  if (filterSlowChargers(isFast, isPublic, selectedFilters)) {
    return true;
  }
  if (filterFastChargers(isFast, isPublic, selectedFilters)) {
    return true;
  }
  if (!selectedFilters[4] && !selectedFilters[5]) {
    return true;
  }
}

const filterByChargerAccess = (isFast: boolean, isPublic: boolean, selectedFilters: number[]) => {
  if (filterSlowChargers(isFast, isPublic, selectedFilters)) {
    return true;
  }
  if (filterFastChargers(isFast, isPublic, selectedFilters)) {
    return true;
  }
  if (!selectedFilters[2] && !selectedFilters[3]) {
    return true;
  }
}

const filterSlowChargers = (isFast: boolean, isPublic: boolean, selectedFilters: number[]) => {

  if (!isFast && isPublic && selectedFilters[3] && selectedFilters[4]) {
    return true;
  }

  //slow and private
  if (!isFast && !isPublic && selectedFilters[3] && selectedFilters[5]) {
    return true;
  }

  //slow and busy
  if (!isFast && selectedFilters[3] && !selectedFilters[4] && !selectedFilters[5]) {
    return true;
  }

  //slow and public
  if (isPublic && !isFast && !selectedFilters[2] && selectedFilters[4] && !selectedFilters[5]) {
    return true;
  }

  //slow and private
  if (!isPublic && !isFast && !selectedFilters[2] && selectedFilters[5] && !selectedFilters[4]) {
    return true;
  }

  if (!selectedFilters[2] && selectedFilters[5] && selectedFilters[4]) {
    return true;
  }

  return false;
}


const filterFastChargers = (isFast: boolean, isPublic: boolean, selectedFilters: number[]) => {
  if (isFast && isPublic && selectedFilters[2] && selectedFilters[4]) {
    return true;
  }

  //Fast and private
  if (isFast && !isPublic && selectedFilters[2] && selectedFilters[5]) {
    return true;
  }

  //Fast 
  if (isFast && selectedFilters[2] && !selectedFilters[4] && !selectedFilters[5]) {
    return true;
  }

  //Fast and public
  if (isPublic && isFast && !selectedFilters[3] && selectedFilters[4] && !selectedFilters[5]) {
    return true;
  }

  //Fast and private
  if (!isPublic && isFast && !selectedFilters[3] && selectedFilters[5] && !selectedFilters[4]) {
    return true;
  }

  if (!selectedFilters[3] && selectedFilters[5] && selectedFilters[4]) {
    return true;
  }

  return false;
}

const DisplayDropdownWithError = (
  title: string | undefined = undefined,
  text: string | undefined = undefined,
): void => {

  const args = [
    'error',
    i18next.t(title ?? 'dropDownAlert.generalError'),
  ];
  
  text && args.push(i18next.t(text));
  Defaults.dropdown?.alertWithType(...args)
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
        DisplayDropdownWithError('dropDownAlert.connectionProblem')
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
