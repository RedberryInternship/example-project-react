export enum SendSmsCodeStatus {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_DOES_NOT_EXISTS = 'USER_DOES_NOT_EXISTS',
}

export enum ChargingFinishedPopupEnum {
  LVL2FullCharge,
  UsedUpFastProps,
  FinishedCharging,
  Bankrupt,
  PaymentFailed,
}

export enum HomeNavigateModes {
  'chargerLocateOnMap',
  'showRoutesToCharger',
  'showAllChargers',
}

export enum ChargerMarkerType {
  fast__public = 'fast__public',
  fast__nonPublic = 'fast__nonPublic',
  lvl2__public = 'lvl2__public',
  lvl2__nonPublic = 'lvl2__nonPublic',
}

export enum ChargerMarkerColor {
  'free',
  'busy',
  'notWorking',
  'notPresent',
}

export enum UserSettingEnum {
  firstName = 'first_name',
  lastName = 'last_name',
  email = 'email',
  phone = 'phone_number',
  activeCard = 'activeCard',
  password = 'password',
  mapMode = 'mapMode',
  addCar = 'user_cars',
}

export enum ChargingTypes {
  fullCharge = 'FULL_CHARGE',
  byAmount = 'BY_AMOUNT',
}

export enum ChargerTypes {
  LVL2 = 'LVL2',
  FAST = 'FAST',
}

export enum ChargerFilters {
  FREE,
  CHARGING,
  FAST,
  LVL2,
  PUBLIC,
  PRIVATE,
}

export enum ChargerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CHARGING = 'CHARGING',
  NOT_PRESENT = 'NOT_PRESENT',
}

export enum ConnectorTypes {
  TYPE_2 = 'Type 2',
  COMBO_2 = 'Combo 2',
  CHADEMO = 'CHAdeMO',
}

export enum ModalTypes {
  REGISTER = 1,
  LEGEND = 2,
  CHARGER_WRAPPER = 3,
  MAP_POPUP = 4,
  LOCATION_PERMISSION = 5,
  PRIVACY_AND_POLICY = 6,
}

export enum ChargingStatus {
  INITIATED = 'INITIATED',
  CHARGING = 'CHARGING',
  CHARGED = 'CHARGED',
  FINISHED = 'FINISHED',
  ON_FINE = 'ON_FINE',
  USED_UP = 'USED_UP',
  ON_HOLD = 'ON_HOLD',
  UNPLUGGED = 'UNPLUGGED',
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  BANKRUPT = 'BANKRUPT',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
}
