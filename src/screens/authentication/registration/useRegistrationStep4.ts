import { useRef, RefObject } from 'react'
import { Alert } from 'react-native'

export default (setActivePage: any) => {
  const _this: RefObject<any> = useRef({ password: '' })

  const onSuccess = () => {
    Alert.alert('sdf')
  }
  const onFail = () => { }
  return {
    onFail,
    onSuccess,
  }
}
