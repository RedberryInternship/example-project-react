import {Dimensions, Platform} from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'
import {env} from '../../env'

export const API: string =
  env === 'local'
    ? 'http://espace.test/api/app/V1'
    : 'https://api-dev.e-space.ge/api/app/V1'

export const MAP_API = 'AIzaSyCmFlBijkD4vTZW6TAQiJOy32_HvigOtjw'
export const MAP_URL = 'https://maps.googleapis.com/maps/api'

export const Width = Dimensions.get('window').width
export const Height = Dimensions.get('window').height

export const locationIfNoGPS = {
  lat: 41.693036,
  lng: 44.801419,
}

export const NotchHeight = Platform.OS === 'ios' ? ifIphoneX(36, 16) : 16

export const DrawerFieldsBeforeAuthorization = [
  {
    image: require('../../assets/images/icons/book-open.png'),
    text: 'drawer.tariff',
    route: 'Tariffs',
  },
  {
    image: require('../../assets/images/icons/phone.png'),
    text: 'drawer.contact',
    route: 'Contact',
  },
  {
    image: require('../../assets/images/icons/message-square.png'),
    text: 'drawer.faq',
    route: 'Faq',
  },
  {
    image: require('../../assets/images/icons/Frame.png'),
    text: 'drawer.partners',
    route: 'Partners',
  },
]

export const DrawerFieldsAfterAuthorization = [
  {
    image: require('../../assets/images/icons/settings.png'),
    text: 'drawer.settings',
    route: 'Settings',
  },
  ...DrawerFieldsBeforeAuthorization,
  {
    image: require('../../assets/images/icons/credit-card.png'),
    text: 'drawer.transactions',
    route: 'TransactionList',
  },
  {
    image: require('../../assets/images/icons/mail.png'),
    text: 'drawer.notifications',
    route: 'Notifications',
  },
]

export const SettingsListFields = [
  {
    image: require('../../assets/images/icons/blue-user.png'),
    name: 'settings.firstname',
    type: 'FirstnameChange',
    editableComponentName: 'settings.editFirstname',
  },
  {
    image: require('../../assets/images/icons/blue-user.png'),
    name: 'settings.lastname',
    type: 'LastnameChange',
    editableComponentName: 'settings.editLastname',
  },
  {
    image: require('../../assets/images/icons/mail.png'),
    name: 'settings.mail',
    type: 'MailChange',
    editableComponentName: 'settings.editMail',
  },
  {
    image: require('../../assets/images/icons/phone.png'),
    name: 'settings.phone',
    type: 'PhoneChange',
    editableComponentName: 'settings.editPhoneNumber',
  },
  {
    image: require('../../assets/images/icons/credit-card.png'),
    name: 'settings.cards',
    type: 'CardChange',
    editableComponentName: 'settings.editCard',
  },
  {
    image: require('../../assets/images/icons/lock.png'),
    name: 'settings.password',
    type: 'PasswordChange',
    editableComponentName: 'settings.editPassword',
  },
]

export const ContactListFields = [
  {
    image: require('../../assets/images/icons/map-pin.png'),
    name: 'contact.address',
    type: 'address',
  },
  {
    image: require('../../assets/images/icons/phone.png'),
    name: 'contact.phone',
    type: 'phone',
  },
  {
    image: require('../../assets/images/icons/mail.png'),
    name: 'contact.eMail',
    type: 'eMail',
  },
  {
    image: require('../../assets/images/icons/facebook.png'),
    name: 'contact.facebookPage',
    type: 'facebookPage',
  },
  {
    image: require('../../assets/images/icons/internet.png'),
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
