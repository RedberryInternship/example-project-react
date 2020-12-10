import { platformIOS } from 'utils/const'

export const Font = {
  HELV_NORM: platformIOS ? 'HelveticaNeue' : 'HelveticaNeueLTStd-Ex',
  HELV_MED: platformIOS
    ? 'HelveticaNeue-Medium'
    : 'HelveticaNeueLTStd-MdEx',
  HELV_HVEX: platformIOS
    ? 'HelveticaNeue-Bold'
    : 'HelveticaNeueLTStd-HvEx',
}

export default Font
