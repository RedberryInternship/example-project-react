import {useRef, RefObject} from 'react'

export default (setActivePage: any, t: any) => {
  // const webview : RefObject<TextInput> = useRef(null);

  const _this: RefObject<any> = useRef({password: ''})

  const postData = () => {}
  const buttonClickHandler = () => {}

  return {
    buttonClickHandler,
    _this,
  }
}
