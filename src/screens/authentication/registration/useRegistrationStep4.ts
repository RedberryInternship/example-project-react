import {useRef, RefObject} from 'react'

export default (setActivePage: any) => {
  const _this: RefObject<any> = useRef({password: ''})

  const postData = () => {}
  const buttonClickHandler = () => {}

  return {
    buttonClickHandler,
    _this,
  }
}
