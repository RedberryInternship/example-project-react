import React, { useRef } from 'react';
import { StyleSheet, StyleProp, ImageSourcePropType, ImageStyle, TextProperties, ScrollView, Text, Image, Alert, GestureResponderEvent, ViewStyle } from 'react-native';
import { useMap } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { Const, Colors } from '../../../src/utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  style: {
    width: Const.Width - 48,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "#008AEE",
    marginHorizontal: 24,
    marginTop: Const.NotchHeight + 16,
    flexDirection: "row",
    flex: 0
  },
  textStyle: {
    color: Colors.primaryWhite,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "bold",
    marginHorizontal: 4
  }
});

type Button = {
  onPress: (event?: GestureResponderEvent) => void | undefined,
  text: string,
  textStyle?: TextProperties,
  image: ImageSourcePropType,
  style?: StyleProp<ViewStyle>,
  imageStyle?: ImageStyle,
  isImageRight?: boolean
}

const onMapRoundButton = ({ onPress, style, image, imageStyle, textStyle, text, isImageRight }: Button) => {



  const { t, i18n } = useTranslation();

  const btnImage  = <Image source={image} style={[{ width: 18, height: 18, resizeMode: "contain" }, imageStyle]} />;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.style, style]}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}

    >
      {isImageRight ? btnImage : null } 
      <Text style={[styles.textStyle, textStyle]} >{t(text)}</Text>
      {!isImageRight ? btnImage : null }
      
    </TouchableOpacity>
  );
};


export default onMapRoundButton;
