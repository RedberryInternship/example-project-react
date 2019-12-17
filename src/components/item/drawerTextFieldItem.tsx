import React from 'react';
import {
    TouchableOpacity,
    GestureResponderEvent,
    ImageSourcePropType,
    TextProperties,
    ImageStyle,
    ViewStyle,
    StyleProp,
    Text,
    StyleSheet,
    Image,
    View,
    ImageProps
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Const, Colors } from '../../../src/utils';


// declare text field type
type TextField = {
    onPress: (event?: GestureResponderEvent) => void | undefined,
    text: string,
    textProps ?: TextProperties,
    image: ImageSourcePropType,
    imageStyle ?: ImageStyle,
    container ?: StyleProp<ViewStyle>,
    badge ?: number
}

const textFieldItem = ({ onPress, text, textProps, image, imageStyle, container, badge }: TextField) => {

    const { t, i18n } = useTranslation();

    // if badge exist make it apper on item
    const textFieldBadge = badge !== undefined && badge > 0 ?
        <View style={styles.badgeConatainer}>
            <Text style={styles.badgeCounter}>{badge}</Text>
        </View>
        : null;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.textFieldContainer, container]} >

            <View style={{ flex: 6, flexDirection: "row", alignItems:"center" }}>
                <Image
                    style={[styles.image, imageStyle]}
                    source={image} />

                <Text style={[styles.textField]}>
                    {t(text)}
                </Text>
            </View>
            <View style={{ flex: 1}}>
                {textFieldBadge}
            </View>


        </TouchableOpacity>
    );

}

export default textFieldItem;


const styles = StyleSheet.create({
    textFieldContainer: {
        flex: 0,
        width: "90%",
        marginLeft: "5%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryDark,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20,
        marginTop: 20
    },
    textField: {
        color: Colors.primaryGreyishWhite,
        marginLeft: 40
    },
    image: {
        width: 25,
        height: 25,
        marginLeft: 36
    },
    badgeConatainer: {
        flex: 0,
        width: 27,
        height: 27,
        backgroundColor: Colors.primaryGreen,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    badgeCounter: {
        color: Colors.primaryGreyishWhite
    }
});