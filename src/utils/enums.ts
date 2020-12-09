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
