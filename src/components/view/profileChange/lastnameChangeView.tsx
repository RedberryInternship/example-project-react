import React, { useState, useEffect } from 'react';

import {
    View, 
    Alert,
    StyleSheet
} from 'react-native';


// components
import { BaseInput } from '../..';


const lastnameChangeView = ({ clicked, navigation }:any) => {


    const [name, setName] = useState("");

    useEffect(() => {
        
        if(clicked === true){
            updateUserLastname(name, navigation);
        }
    });


    return (
        <View style={styles.container}>
            <BaseInput
                title={"settings.newLastname"}
                image={require("../../../../assets/images/icons/blue-user.png")}
                onChangeText={(text: string) => setName(text)}
                onSubmitEditing={ () => {
                    updateUserLastname(name, navigation);
                    
                } }
            />
        </View>
    );
}


const updateUserLastname = ( firstname : any, navigation : any) => {
    Alert.alert("Lastname Updated!", "", [
        {text:"OK", onPress: () => { navigation.goBack();  } }
    ]);
}

export default lastnameChangeView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 80
    }
});