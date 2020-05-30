import {useState, useEffect} from 'react'
import {Alert, Linking} from 'react-native'

import {Defaults, Const, Helpers} from 'utils'
import {Navigation, ContactInfoResponseType} from 'allTypes'
import services from 'services'

const {Logger} = Helpers

export default (navigation: Navigation) => {
  const [message, setMessage] = useState<string>('')
  const [data, setData] = useState<ContactInfoResponseType | undefined>(
    undefined,
  )
  useEffect(() => {
    services.getContactInfo().then((data) => setData(data))
  }, [])

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
      openUrl(`tel:${data?.phone.trim() ?? ''}`, 'Phone')
    },

    eMail: () => {
      openUrl(`mailto:${data?.email ?? ''}?subject=contact`, 'Mail')
    },

    facebookPage: () => {
      openUrl(
        'fb://group/272061007052173',
        'FaceBook',
        'https://www.facebook.com/groups/272061007052173/',
      )
    },

    webPage: () => {
      openUrl(data?.web_page_url ?? '', 'Web')
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
        if (typeof backupUrl === 'string') {
          Linking.openURL(backupUrl)
        } else {
          throw new Error(`Opening Url Not Supported`)
        }
      }
    } catch (e) {
      Logger(e)
      let msg = ''
      // Vobi todo: move this as util
      // Vobi Todo: you can do something like this 
      // Vobi Todo: errors = {
      // Facebook: 'Something Went Wrong While Opening FaceBook...',
      // Address: 'Something Went Wrong While Opening Map...',
      // }
      // and here const msg = errors[errorMsgType]
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
    data,
  }
}
