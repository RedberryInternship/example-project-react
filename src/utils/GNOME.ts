import {Platform} from 'react-native'
import {Const} from 'utils'

export const GNOME = {
  HELV_NORM: Const.platformIOS ? 'HelveticaNeue' : 'HelveticaNeueLTStd-Ex',
  HELV_MED: Const.platformIOS
    ? 'HelveticaNeue-Medium'
    : 'HelveticaNeueLTStd-MdEx',
  HELV_HVEX: Const.platformIOS
    ? 'HelveticaNeue-Bold'
    : 'HelveticaNeueLTStd-HvEx',
}

export default GNOME
