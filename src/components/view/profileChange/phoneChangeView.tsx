import React, { useState, useEffect } from 'react';

import {
    View,
    Alert,
    StyleSheet
} from 'react-native';


// components
import { BaseInput, PhoneNumberInput } from '../..';


const phoneChangeView = ({ clicked, navigation }: any) => {


    const [name, setName] = useState("");

    useEffect(() => {

        if (clicked === true) {
            updateUserPhone(name, navigation);
        }
    });


    return (
        <View style={styles.container}>
            <BaseInput
                title={"settings.phoneNumber"}
                image={require("../../../../assets/images/icons/phone.png")}
                onChangeText={(text: string) => setName(text)}
                onSubmitEditing={() => {
                    updateUserPhone(name, navigation);

                }}
            />

            <PhoneNumberInput
                onChangeText={ null }
                onSubmit={ null }
                value={null }
                onFocus={null}
                // ref={hook.phoneRef}
            />
        </View>
    );
}


const updateUserPhone = (firstname: any, navigation: any) => {
    Alert.alert("Firstname Updated!", "", [
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