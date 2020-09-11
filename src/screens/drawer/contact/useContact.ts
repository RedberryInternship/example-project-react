import { useState, useEffect } from 'react'
import { Linking } from 'react-native'

import { Defaults, Const, Helpers } from 'utils'
import { Navigation, ContactInfoResponseType } from 'allTypes'
import services from 'services'
import {platformIOS} from '../../../utils/const';

const { Logger } = Helpers
const fbPageType = platformIOS ? 'profile' : 'page';
export default (navigation: Navigation) => {
  const [message, setMessage] = useState<string>('')
  const [data, setData] = useState<ContactInfoResponseType | undefined>(
    undefined,
  )
  useEffect(() => {
    services.getContactInfo().then((data) => setData(data))
    console.log("CONTACT:",data);

  }, [])

  const sendMessage = async (): Promise<void> => {
    if (!message) {
      Helpers.DisplayDropdownWithError('pleaseFillInput')
      return
    }
    try {
      await services.sendFeedback(message)
      setMessage('')
      Helpers.DisplayDropdownWithSuccess('contact.yourFeedbackReceived')
    } catch (error) {
      Helpers.DisplayDropdownWithError()
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
      openUrl(
        'fb://'+fbPageType+'/'+data?.fb_page_url.split('/')[3],
        'FaceBook',
        data?.fb_page_url,
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
    console.log("URL:",url);
    Linking.canOpenURL(url)
    .then(response => {
      if(response){
        Linking.openURL(url);
      }else{
        Linking.openURL(backupUrl.toString());
      }
    }).catch(error => {
      Logger(error)
      if(error.message.indexOf('fb://'+fbPageType) > -1 && typeof backupUrl === 'string'){
        Linking.openURL(backupUrl);
        return;
      }
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
    })
  }

  return {
    message,
    setMessage,
    sendMessage,
    outgoingLinkMethods,
    data,
  }
}
