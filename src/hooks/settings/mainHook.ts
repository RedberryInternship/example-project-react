import {useContext} from 'react'
/*
 * in this case I couldn't import App Context by means of absolute path
 */
import {AppContext} from '../../../App'
import {Colors} from 'utils'

type SettingsInfoType = {
  firstName: string
  lastName: string
  email: string
  phone: string
  cardExists: boolean | string
  password: string
  mapMode: string
}

type SettingsValuesType = {
  value: any
}
// Vobi todo: this is helper not a hook
const helpers = {
  structureSettingsInfoObj: (): SettingsInfoType => {
    const context: any = useContext(AppContext)

    const activeCardNumber = '********* 9281'

    const isContextLoaded = context && context.state && context.state.user

    return {
      firstName: isContextLoaded ? context.state.user.first_name : '',
      lastName: isContextLoaded ? context.state.user.last_name : '',
      email: isContextLoaded ? context.state.user.email : '',
      phone: isContextLoaded ? context.state.user.phone_number : '',
      cardExists: activeCardNumber || false,
      password: '*********',
      mapMode: isContextLoaded
        ? context.state.user.mapMode ?? 'settings.automatic'
        : 'settings.automatic',
    }
  },
  makeSettingsInfo: () => {
    const info = helpers.structureSettingsInfoObj()

    const settingsInfo = [
      {
        value: info.firstName,
      },
      {
        value: info.lastName,
      },
      {
        value: info.email,
      },
      {
        value: info.phone,
      },
      {
        value: info.cardExists,
      },
      {
        value: info.password,
      },
      {
        value: info.mapMode,
      },
    ]

    return settingsInfo
  },

  makeValue: (key: number, SettingsInfo: Array<SettingsValuesType>): string => {
    if (!SettingsInfo) return ''
    const field = SettingsInfo[key]?.value

    if (helpers.isFieldEmail(key) && helpers.isFieldEmpty(field)) {
      return 'settings.notAdded'
    }

    if (helpers.isFieldCard(key) && helpers.isFieldEmpty(field)) {
      return 'settings.notAdded'
    }

    return field?.toString()
  },

  isValueAdded: (
    key: number,
    SettingsInfo: Array<SettingsValuesType>,
  ): boolean => {
    if (!SettingsInfo) return false

    const field = SettingsInfo[key]?.value

    const emailFieldDetermination =
      helpers.isFieldEmail(key) && helpers.isFieldEmpty(field)
    const cardFieldDetermination =
      helpers.isFieldCard(key) && helpers.isFieldEmpty(field)

    return emailFieldDetermination || cardFieldDetermination
  },
  determineColor: (
    key: number,
    SettingsInfo: Array<SettingsValuesType>,
  ): string => {
    if (!SettingsInfo) return Colors.primaryWhite

    if (helpers.isFieldPassword(key)) {
      return Colors.primaryGray
    }

    if (helpers.isFieldCard(key)) {
      if (!helpers.isFieldEmpty(SettingsInfo[key].value)) {
        return Colors.primaryGray
      }
    }

    return Colors.primaryWhite
  },

  isFieldEmail: (key: number): boolean => {
    return key === 2
  },
  isFieldCard: (key: number): boolean => {
    return key === 4
  },
  isFieldPassword: (key: number): boolean => {
    return key === 5
  },
  isFieldEmpty: (el: any): boolean => {
    return typeof el !== 'string' || el === ''
  },
}

export default () => {
  return {
    ...helpers,
  }
}
