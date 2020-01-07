import React, { useRef } from 'react';
import { StyleSheet, StyleProp, ImageSourcePropType, ImageStyle,ImageURISource, TextProperties,TextStyle ,ScrollView, Text, Image, Alert, GestureResponderEvent, ViewStyle } from 'react-native';
import { useMap } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { Const, Colors } from '../../../src/utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


const styles = StyleSheet.create({
  style: {
    width: Const.Width - 48,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "stretch",
    elevation: 1,
    marginHorizontal: 24,
    marginTop: Const.NotchHeight + 16,
    flex: 0
  },
  touchableStyle : {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    color: Colors.primaryWhite,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "bold",
    marginHorizontal: 4,
    textAlign:"center",
    alignSelf:"center"
  }
});

type Button = {
  onPress: (event?: GestureResponderEvent) => void | undefined,
  text: string,
  textStyle?: TextStyle,
  image? : ImageSourcePropType,
  style?: StyleProp<ViewStyle> ,
  imageStyle?: ImageStyle,
  isImageRight?: boolean
}

const onMapRoundButton = ({ onPress, style, image, imageStyle, textStyle, text, isImageRight }: Button) => {



  const { t } = useTranslation();

  const btnImage  = <Image source={image} style={[{ width: 18, height: 18, resizeMode: "contain" }, imageStyle]} />;

  return (
    <LinearGradient colors={style && style.backgroundColor  ?  [style.backgroundColor, style.backgroundColor] : ['#009AF0', '#008AEE']}  start={{x:0, y:1}} end={{x:1, y:0}} style={[styles.style, style]}>
      <TouchableOpacity
        onPress={onPress}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        style={[styles.touchableStyle]}
      >
        {isImageRight ? btnImage : null } 
        <Text style={[styles.textStyle, textStyle]} >{t(text)}</Text>
        {!isImageRight ? btnImage : null }
      </TouchableOpacity>
    </LinearGradient>
    
  );
};


export default onMapRoundButton;
