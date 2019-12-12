import React, {useEffect, useState,useRef, useCallback} from "react";
import {AppState, Keyboard, Alert,Animated, Easing } from "react-native"
import { Defaults, NavigationActions, Const, Ajax } from "../utils";
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
    // Ajax.get()

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

  const animate = () => 
    ({
      opacity : 
        _this.current.animatedSearchContentHeight.interpolate({
          inputRange : [0, searchContentHeight],
          outputRange : [0.8 , 1],
        }),
        borderTopLeftRadius :  10,
        borderTopRightRadius :  10,
        borderBottomLeftRadius : _this.current.animatedSearchContentHeight.interpolate({
          inputRange : [0, searchContentHeight],
          outputRange : [10 , 0],
        }),
      borderBottomRightRadius : _this.current.animatedSearchContentHeight.interpolate({
          inputRange : [0, searchContentHeight],
          outputRange : [10 , 0],
        }),
    });

  return{t, _this, showSearchContent ,animate, setShowSearchContent , InputRef , searchContentHeight , closeClick, textHandler}

}