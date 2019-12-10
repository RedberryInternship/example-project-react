import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert,Animated, Easing } from "react-native"
import { Defaults, NavigationActions, Const } from "../utils";
import {useTranslation} from 'react-i18next';

const searchContentHeight = Const.Height - 350;

export default ()=> {

  const InputRef : any = useRef(null);
  const [showSearchContent, setShowSearchContent] : any = useState(false);

  const _this : any = useRef({animatedSearchContentHeight : new Animated.Value(0), text : ''})
  
  const { t, i18n } = useTranslation();


  const textHandler = (val : string) => {
    InputRef.current.setNativeProps({
      text : val
    })
    _this.current.text = val;

  }

  useEffect(() =>{
    Animated.timing(_this.current.animatedSearchContentHeight, {
      toValue : showSearchContent ? searchContentHeight : 0,
      duration: 350,
      easing : Easing.out(Easing.ease),
      // useNativeDriver : true,
    }).start(() => showSearchContent ? InputRef.current.focus() : 0);
  },[showSearchContent])

  const closeClick = () =>{
    if(_this.current.text !=='')
      return textHandler('') 
    setShowSearchContent(false),
    Keyboard.dismiss();
  }

  return{t, _this, showSearchContent , setShowSearchContent , InputRef , searchContentHeight , closeClick, textHandler}

}