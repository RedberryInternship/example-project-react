import React, { useState, useEffect, useRef } from 'react';

import {
    View,
    Alert,
    StyleSheet
} from 'react-native';


// components
import { PhoneNumberInput, ReceiveCode } from '../..';


const phoneChangeView = ({ clicked, navigation }: any) => {


    const [number, setNumber] = useState("");

    useEffect(() => {

        if (clicked === true) {
            updateUserPhone(number, navigation);
        }
    });

    const phoneRef = useRef<any>(null);

    return (
        <View style={styles.container}>

            <PhoneNumberInput
                onFocus={ null }
                phoneTextHandler = {(text: string) => setNumber(text)}
                ref={ phoneRef }
            />

            <ReceiveCode />
        </View>
    );
}


const updateUserPhone = (number: any, navigation: any) => {
    Alert.alert("Phone Number Updated!", "", [
        { text: "OK", onPress: () => { navigation.goBack(); } }
    ]);
}

export default phoneChangeView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 80
    }
});