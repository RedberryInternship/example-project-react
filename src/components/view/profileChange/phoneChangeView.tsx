import React from 'react';

import {
    View,
    StyleSheet
} from 'react-native';


// components
import { 
    PhoneNumberInput, 
    ReceiveCode 
} from '../..';

// hooks
import { usePhoneChange } from '../../../hooks';


const phoneChangeView = ({ navigation, clicked, setClicked }: any) => {

    const hook = usePhoneChange(navigation, clicked, setClicked);

    return (
        <View style={styles.container}>

            <PhoneNumberInput
                value={hook._this.current.phone}
                // onSubmit={hook.onSubmit}
                ref={hook.phoneInputRef}
                _this={hook._this}
                codeRef={hook.codeRef}
            />


            <ReceiveCode
                onChangeText={hook.receiveCodeTextHandler}
                onSubmit={hook.receiveCodeOnSubmit}
                recieveCode={hook.recieveCode}
                ref={hook.codeRef} />
        </View>
    );
}

export default phoneChangeView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 80
    }
});