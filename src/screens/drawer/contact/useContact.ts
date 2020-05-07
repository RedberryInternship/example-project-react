import {useState} from 'react'
import {Alert, Linking} from 'react-native'

import {Defaults, Const, Helpers} from 'utils'
import {Navigation} from 'allTypes'
import services from 'services'

const {Logger} = Helpers

export default (navigation: Navigation) => {
  const [message, setMessage] = useState<string>('')

  const sendMessage = async (): Promise<void> => {
    if (!message) {
      Helpers.DisplayDropdownWithError('pleaseFillInput')
      return
    }
    try {
      await services.sendFeedback(message)

      Helpers.DisplayDropdownWithSuccess('contact.yourFeedbackReceived')
    } catch (error) {
      Helpers.DisplayDropdownWithError()
    }
  }

  const outgoingLinkMethods: {[key: string]: () => void} = {
    address: () => {
      const mapsInfo = Const.eSpaceLocationOnMapInfo
      const mapsUrl = `${mapsInfo.scheme}@${mapsInfo.latitude},${mapsInfo.longitude}( ${mapsInfo.label} )`
      openUrl(mapsUrl, 'Address')
    },
    phone: () => {
      openUrl(`tel:591935080`, 'Phone')
    },

    eMail: () => {
      openUrl(`mailto:gela@espace.ge?subject=e-space`, 'Mail')
    },

    facebookPage: () => {
      openUrl(
        'fb://group/272061007052173',
        'FaceBook',
        'https://www.facebook.com/groups/272061007052173/',
      )
    },

    webPage: () => {
      openUrl('http://e-space.ge/', 'Web')
    },
  }

  type ErrorMessageType = 'Address' | 'Phone' | 'Mail' | 'FaceBook' | 'Web'

  const openUrl = async (
    url: string,
    errorMsgType: ErrorMessageType,
    backupUrl: string | boolean = false,
  ): Promise<void> => {
    try {
      const canOpenUrl = await Linking.canOpenURL(url)

      if (canOpenUrl) {
        Linking.openURL(url)
      } else {
        // Vobi Todo: you just need if(backupUrl)
        if (typeof backupUrl === 'string') {
          Linking.openURL(backupUrl)
        } else {
          throw new Error(`Opening Url Not Supported`)
        }
      }
    } catch (e) {
      Logger(e)
      let msg = ''
      // Vobi todo: move this as helper
      switch (errorMsgType) {
        case 'Address':
          msg = 'Something Went Wrong While Opening Map...'
          break
        case 'FaceBook':
          msg = 'Something Went Wrong While Opening FaceBook...'
          break
        case 'Mail':
          msg = 'Something Went Wrong While Opening Mail...'
          break
        case 'Phone':
          msg = 'Something Went Wrong While Calling...'
          break
        case 'Web':
          msg = 'Something Went Wrong While Opening website...'
          break
        default:
          msg = 'Something Went Wrong...'
      }

      Defaults.dropdown?.alertWithType('error', 'Error', msg)
    }
  }

  return {
    message,
    setMessage,
    sendMessage,
    outgoingLinkMethods,
  }
}
