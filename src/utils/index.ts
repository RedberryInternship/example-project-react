import Defaults from './defaults'
import Ajax from './ajax'
import Style from './style'
import Colors from './colors'
import * as Const from './const'
import GNOME from './GNOME'
import NavigationActions from './navigation.service'
import i18n, {getLocaleText} from './localization/localization'
import locationConfig from './mapAndLocation/location'
import {regionFrom, determineTimePeriod} from './mapAndLocation/mapFunctions'
import mapStyles from './mapAndLocation/mapStyle'
import mapStyle2 from './mapAndLocation/mapStyle2'
import apiServices from './services'
import useFirebase from './firebase'

export {
  Defaults,
  Ajax,
  Style,
  Colors,
  GNOME,
  NavigationActions,
  i18n,
  getLocaleText,
  locationConfig,
  regionFrom,
  Const,
  mapStyles,
  mapStyle2,
  determineTimePeriod,
  apiServices,
  useFirebase,
}
