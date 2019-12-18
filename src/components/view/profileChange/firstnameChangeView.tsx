import React, { useState, useEffect, useRef } from 'react';

import {
    Text, 
    View, 
    Alert,
    StyleSheet,
    TextInput
} from 'react-native';


// components
import { BaseInput } from '../..';

// translation
import { useTranslation } from 'react-i18next';


const firstnameChangeView = () => {


    const { t, i18n } = useTranslation();
    const [name, setName] = useState("");

    const inputRef:any = useRef(null);

    useEffect(() => {
        // inputRef.current.focus();
    });


    return (
        <View style={styles.container}>
            <BaseInput
                title={"settings.editFirstname.firstname"}
                image={require("../../../../assets/images/icons/blue-user.png")}
                onChangeText={(text: string) => setName(text)}
                onSubmitEditing={ () => updateUserFirstname(name) }
                ref={inputRef}
            />
        </View>
    );
}


const updateUserFirstname = ( firstname : any ) => {
    Alert.alert("Firstname Updated!");
}

export default firstnameChangeView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 80
    }
});