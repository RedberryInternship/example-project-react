import React from 'react';
import {
    View,
    Text,
    GestureResponderEvent,
    ImageSourcePropType,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { Colors } from '../../utils';

type ListItem = {
    onPress: (event?: GestureResponderEvent) => void | undefined,
    image: ImageSourcePropType,
    name: string,
    value: string,
    confirmed ?: string | boolean | null,
    valueColor: string
}

const settingsListItem = ({ onPress, image, name, value, confirmed, valueColor = Colors.primaryWhite }: ListItem) => {


    const { t} = useTranslation();

    return (
        <TouchableOpacity onPress={onPress} >

            <View style={styles.container}>

                <View style={styles.imageAndName}>
                    <Image source={image} style={styles.image} />
                    <Text style={styles.name}>{t(name)}</Text>
                </View>

                <View style={styles.valueAndArrow}>
                    <Text style={[styles.value, { color: valueColor}]}>{confirmed !== null ? t(value) : value}</Text>
                    <Image source={require("../../../assets/images/icons/chevron-right.png")} style={styles.arrow} />
                </View>
            </View>

        </TouchableOpacity>
    );
}

export default settingsListItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryDark,
        paddingBottom: 20,
        paddingTop: 20
    },

    imageAndName: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 24
    },
    valueAndArrow: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 24,
        // backgroundColor:"red"
    },
    arrow:{
        width: 15,
        height: 15
    },
    image:{
        width:24,
        height:24,
        marginRight: 24,
        resizeMode:"contain"

    },
    name:{
        color: Colors.primaryGray
    },
    value: {
        marginRight: 12,
    }

});