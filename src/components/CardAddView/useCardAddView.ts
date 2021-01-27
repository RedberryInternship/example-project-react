import { useCallback, useState, useEffect } from 'react'
import { WebViewNavigation } from 'react-native-webview'
import { DisplayDropdownWithError, remoteLogger } from 'utils/inform'
import services from 'services'
import { GetCardAddUrl } from 'types'
import { UseCardAddViewProps } from './types'

const useCardAddView = ({ onSuccess, onFail }: UseCardAddViewProps) => {
  const [urlData, setUrlData] = useState<GetCardAddUrl>()
  const [loading, setLoading] = useState<boolean>(true)

  const navigationStateChange = useCallback(
    ({ url }: WebViewNavigation) => {
      if (url.includes(urlData?.success_url)) {
        onSuccess()
      } else if (url.includes(urlData?.failed_url)) {
        onFail && onFail()
        getCardAddUrl()
      }
    },
    [urlData, onFail, onSuccess],
  )

  const getCardAddUrl = async () => {
    try {
      const data = await services.getCardAddUrl()
      setUrlData(data)
      setTimeout(() => setLoading(false), 4000)
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
    setLoading,
    loading,
    urlData,
  }
}

export default useCardAddView
