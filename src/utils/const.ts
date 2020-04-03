import {Dimensions, Platform} from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'
import {env} from '../../env'
import images from 'assets/images'

export const API: string =
  env === 'local'
    ? 'http://espace.test/api/app/V1'
    : 'https://api-dev.e-space.ge/api/app/V1'

export const MAP_API = 'AIzaSyCmFlBijkD4vTZW6TAQiJOy32_HvigOtjw'
export const MAP_URL = 'https://maps.googleapis.com/maps/api'
// Vobi Todo: move this as config
export const Width = Dimensions.get('window').width
export const Height = Dimensions.get('window').height

export const locationIfNoGPS = {
  lat: 41.693036,
  lng: 44.801419,
}

export const NotchHeight = Platform.OS === 'ios' ? ifIphoneX(36, 16) : 16

export const DrawerFieldsBeforeAuthorization = [
  {
    image: images.bookOpen,
    text: 'drawer.tariff',
    route: 'Tariffs',
  },
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
  {
    image: images.mail,
    text: 'drawer.notifications',
    route: 'Notifications',
  },
]

export const SettingsListFields = [
  {
    image: images.blueUser,
    name: 'settings.firstname',
    type: 'FirstnameChange',
    editableComponentName: 'settings.editFirstname',
  },
  {
    image: images.blueUser,
    name: 'settings.lastname',
    type: 'LastnameChange',
    editableComponentName: 'settings.editLastname',
  },
  {
    image: images.mail,
    name: 'settings.mail',
    type: 'MailChange',
    editableComponentName: 'settings.editMail',
  },
  {
    image: images.phone,
    name: 'settings.phone',
    type: 'PhoneChange',
    editableComponentName: 'settings.editPhoneNumber',
  },
  {
    image: images.creditCard,
    name: 'settings.cards',
    type: 'CardChange',
    editableComponentName: 'settings.editCard',
  },
  {
    image: images.lock,
    name: 'settings.password',
    type: 'PasswordChange',
    editableComponentName: 'settings.editPassword',
  },
  {
    image: images.lock,
    name: 'settings.mapColor',
    type: 'mapColorChange',
    editableComponentName: 'settings.editPassword',
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
  scheme: Platform.select({android: 'geo:0,0?q=', ios: 'maps:0,0?q='}),
  latitude: 41.707204,
  longitude: 44.784487,
  label: 'E-space',
}
