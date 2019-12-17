import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native';

import { Const, Colors } from '../../utils';


type LocaleButton = {
    onPress: (event ?: GestureResponderEvent) => void | undefined,
    text: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
}


const baseLocaleButton = ({ onPress, style, text, textStyle }: LocaleButton) => {

    return <TouchableOpacity onPress={onPress}>
                <View style={[styles.localeUiContainer, style]}>
                    <Text style={[styles.localeText, textStyle]}>{ text }</Text>
                </View>
            </TouchableOpacity>;
}



export default baseLocaleButton;

const styles = StyleSheet.create({
    localeUiContainer: {
        width: 50,
        height: 50,
        backgroundColor: Colors.primaryBlue,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    localeText: {
        color: Colors.primaryWhite
    }
});