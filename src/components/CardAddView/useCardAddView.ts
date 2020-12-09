import { useCallback, useState, useEffect } from 'react'
import { WebViewNavigation } from 'react-native-webview'
import { DisplayDropdownWithError, remoteLogger } from 'helpers/inform'
import services from 'services'
import { GetCardAddUrl } from 'allTypes'
import { UseCardAddViewProps } from './types'

const useCardAddView = ({ onSuccess, onFail }: UseCardAddViewProps) => {
  const [urlData, setUrlData] = useState<GetCardAddUrl>()
  const navigationStateChange = useCallback(
    (event: WebViewNavigation) => {
      if (event.url.includes(urlData?.success_url)) {
        onSuccess()
      } else if (event.url.includes(urlData?.failed_url)) {
        onFail && onFail()
        getCardAddUrl()
      }
    },
    [urlData],
  )

  const getCardAddUrl = async () => {
    try {
      const data = await services.getCardAddUrl()
      setUrlData(data)
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  useEffect(() => {
    getCardAddUrl()
  }, [])

  return {
    navigationStateChange,
    urlData,
  }
}

export default useCardAddView
