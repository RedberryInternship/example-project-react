import { Dimensions, Platform } from 'react-native'
import images from 'assets/images'
import { UserSettingEnum, SettingsListFieldType } from 'types'
import Colors from './colors'

// export const domain = 'https://api-dev.e-space.ge'
export const domain = 'https://app.e-space.ge' // prod

export const API = `${domain}/api/app/V1`

/**
 * App custom build number
 * for back-end.
 */
export const BUILD_NUMBER = 211

// google maps api
export const MAP_API = 'AIzaSyCmFlBijkD4vTZW6TAQiJOy32_HvigOtjw'
export const MAP_URL = 'https://maps.googleapis.com/maps/api'

export const Width = Dimensions.get('window').width
export const Height = Dimensions.get('window').height

export const platformIOS = Platform.OS === 'ios'
export const locationIfNoGPS = {
  lat: 41.693036,
  lng: 44.801419,
}

export const DrawerFieldsBeforeAuthorization = [
  {
    image: images.phone,
    text: 'drawer.contact',
    route: 'Contact',
  },
  {
    image: images.messageSquare,
    text: 'drawer.faq',
    route: 'Faq',
  },
  {
    image: images.frame,
    text: 'drawer.partners',
    route: 'Partners',
  },
]

export const DrawerFieldsAfterAuthorization = [
  {
    image: images.settings,
    text: 'drawer.settings',
    route: 'Settings',
  },
  ...DrawerFieldsBeforeAuthorization,
  {
    image: images.creditCard,
    text: 'drawer.transactions',
    route: 'TransactionList',
  },
]

export const SettingsListFields: SettingsListFieldType[] = [
  {
    image: images.blueUser,
    name: 'settings.firstname',
    type: UserSettingEnum.firstName,
    editableComponentName: 'settings.editFirstname',
  },
  {
    image: images.blueUser,
    name: 'settings.lastname',
    type: UserSettingEnum.lastName,
    editableComponentName: 'settings.editLastname',
  },
  {
    image: images.mail,
    name: 'settings.mail',
    type: UserSettingEnum.email,
    editableComponentName: 'settings.editMail',
    onEmptyText: 'settings.add',
    color: Colors.primaryGray,
  },
  {
    image: images.phone,
    name: 'settings.phone',
    type: UserSettingEnum.phone,
    editableComponentName: 'settings.editPhoneNumber',
  },
  {
    image: images.creditCard,
    name: 'settings.cards',
    type: UserSettingEnum.activeCard,
    editableComponentName: 'settings.editCard',
    color: Colors.primaryGray,
    onEmptyText: 'settings.add',
  },
  {
    image: images.lock,
    name: 'settings.password',
    type: UserSettingEnum.password,
    editableComponentName: 'settings.editPassword',
    color: Colors.primaryGray,
    onEmptyText: '*********',
  },
  {
    image: images.lock,
    name: 'settings.mapColor',
    type: UserSettingEnum.mapMode,
    editableComponentName: 'settings.editPassword',
  },
  {
    image: images.lock,
    name: 'settings.addCar',
    type: UserSettingEnum.addCar,
    editableComponentName: 'settings.addCar',
    onEmptyText: 'settings.add',
    color: Colors.primaryGray,
  },
]

export const ContactListFields = [
  {
    image: images.mapPin2,
    name: 'contact.address',
    type: 'address',
  },
  {
    image: images.phone,
    name: 'contact.phone',
    type: 'phone',
  },
  {
    image: images.mail,
    name: 'contact.eMail',
    type: 'eMail',
  },
  {
    image: images.facebook,
    name: 'contact.facebookPage',
    type: 'facebookPage',
  },
  {
    image: images.internet,
    name: 'contact.webPage',
    type: 'webPage',
  },
]

export const FilterTypes = [
  'filterTypes.free',
  'filterTypes.inUse',
  'filterTypes.fast',
  'filterTypes.lvl2',
  'filterTypes.public',
  'filterTypes.notPublic',
]

export const eSpaceLocationOnMapInfo = {
  scheme: Platform.select({ android: 'geo:0,0?q=', ios: 'maps:0,0?q=' }),
  latitude: 41.7276579,
  longitude: 44.7486845,
  label: 'E-space',
}

export type ConnectorTypeChargePowers = {
  'Combo 2': number,
  CHAdeMO: number,
  'Type 2': number,
}

export type ConnectorTypes = keyof ConnectorTypeChargePowers

export const connectorTypeChargePowers: ConnectorTypeChargePowers = {
  'Combo 2': 50,
  CHAdeMO: 50,
  'Type 2': 22,
}

export const phoneNumberPlaceHolder = { label: '+995', value: '+995' }
