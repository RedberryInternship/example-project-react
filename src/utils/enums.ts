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
