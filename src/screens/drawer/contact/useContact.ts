import { useState, useEffect } from 'react'
import { Linking } from 'react-native'
import { useTranslation } from 'react-i18next'
import * as Const from 'utils/const'
import { ContactInfoResponseType } from 'allTypes'
import services from 'services'
import {
  DisplayDropdownWithSuccess,
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'
import { platformIOS } from 'utils/const'
import { OpenUrl } from './types'

const fbPageType = platformIOS ? 'profile' : 'page'

/**
 * Contact page hook.
 */
export default () => {
  const [message, setMessage] = useState<string>('')
  const [data, setData] = useState<ContactInfoResponseType | undefined>()
  const { t } = useTranslation()

  /**
   * Get contact information and set state.
   */
  useEffect(() => {
    const getContactInfoData = async () => {
      try {
        const data = await services.getContactInfo()
        setData(data)
      } catch (error) {
        DisplayDropdownWithError()
        remoteLogger(error)
      }
    }

    getContactInfoData()
  }, [])

  /**
   * Send message handler.
   */
  const sendMessage = async () => {
    if (!message) {
      DisplayDropdownWithError('pleaseFillInput')
      return
    }
    try {
      await services.sendFeedback(message)
      setMessage('')
      DisplayDropdownWithSuccess('contact.yourFeedbackReceived')
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  const outgoingLinkMethods: { [key: string]: () => void } = {
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
      openUrl(`fb://${fbPageType}/${data?.fb_page_url.split('/')[3]}`, 'Facebook', data?.fb_page_url)
    },

    webPage: () => {
      openUrl(data?.web_page_url ?? '', 'Web')
    },
  }


  const openUrl: OpenUrl = async (url, errorMsgType, backupUrl = false) => {
    try {
      const response = await Linking.canOpenURL(url)

      if (response) {
        Linking.openURL(url)
      } else {
        Linking.openURL(backupUrl.toString())
      }
    } catch (error) {
      remoteLogger(error)
      if (error.message.indexOf(`fb://${fbPageType}`) > -1 && typeof backupUrl === 'string') {
        Linking.openURL(backupUrl)
        return
      }

      const errorMessage = `dropDownAlert.contact.${errorMsgType}`
      DisplayDropdownWithError(errorMessage)
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
