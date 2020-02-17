import React from 'react';

import {
    View, 
    StyleSheet
} from 'react-native';

// components
import { BaseInput } from '../..';

// hooks
import { useFirstnameChange } from '../../../hooks';


const firstnameChangeView = ({navigation, clicked, setClicked }:any) => {

    const mainHook = useFirstnameChange(navigation, clicked, setClicked);

    return (
        <View style={styles.container}>
            <BaseInput
                title={"settings.newFirstname"}
                image={require("../../../../assets/images/icons/blue-user.png")}
                onChangeText={mainHook.onChangeText}
                onSubmit={mainHook.onSubmitEditing}
                value={mainHook.firstname}
                ref={mainHook.firstnameInputRef}
            />
        </View>
    );
}

export default firstnameChangeView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
