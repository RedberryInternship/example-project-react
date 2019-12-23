import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

// keyboarad aware scroll view
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// components
import {
    BaseHeader,
    BaseButton,

    FirstnameChangeView,
    LastnameChangeView,
    CardChangeView,
    MailChangeView,
    PhoneChangeView,
    PasswordChangeView
} from '../../components';

// utils
import { Colors, Const } from '../../utils';

const profileChange = ({ navigation }: any) => {

    let $editView = null;
    const $headerName = navigation.getParam("name");
    const $type = navigation.getParam("type");
    const $payload = navigation.getParam("payload");

    const [saveButtonClicked, setSaveButtonClicked] = useState(false);

    switch ($type) {
        case "FirstnameChange":
            $editView = <FirstnameChangeView
                {...$payload}
                clicked={saveButtonClicked}
                setClicked={setSaveButtonClicked}
                navigation={navigation} />;
            break;

        case "LastnameChange":
            $editView = <LastnameChangeView
                {...$payload}
                clicked={saveButtonClicked}
                setClicked={setSaveButtonClicked}
                navigation={navigation} />;
            break;

        case "CardChange":
            $editView = <CardChangeView
                {...$payload}
                clicked={saveButtonClicked}
                setClicked={setSaveButtonClicked}
                navigation={navigation} />;
            break;

        case "MailChange":
            $editView = <MailChangeView
                {...$payload}
                clicked={saveButtonClicked}
                setClicked={setSaveButtonClicked}
                navigation={navigation} />;
            break;

        case "PhoneChange":
            $editView = <PhoneChangeView
                {...$payload}
                clicked={saveButtonClicked}
                setClicked={setSaveButtonClicked}
                navigation={navigation} />;
            break;
        case "PasswordChange":
            $editView = <PasswordChangeView
                {...$payload}
                clicked={saveButtonClicked}
                setClicked={setSaveButtonClicked}
                navigation={navigation} />;
    }


    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
                <BaseHeader
                    title={$headerName}
                    onPressLeft={() => navigation.goBack()} />

                <KeyboardAwareScrollView
                    style={{ flex: 1, backgroundColor: Colors.primaryBackground }}
                    contentContainerStyle={{}}
                    bounces={true}
                    enableOnAndroid={true}
                    enableAutomaticScroll={false}                    
                    extraHeight={0}
                    extraScrollHeight={-150}
                    enableResetScrollToCoords={true}
                    keyboardShouldPersistTaps={"handled"}
                    resetScrollToCoords={{ x: 0, y: 0 }} >

                    {$editView}
                </KeyboardAwareScrollView>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewContainer}
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === "android" ? 50 : 20} >
                <BaseButton
                    onPress={() => setSaveButtonClicked(true)}
                    text="save"
                    image={require("../../../assets/images/icons/arrow_left.png")}
                    isImageRight={true} />
            </KeyboardAvoidingView>
        </View>
    );
}


export default profileChange;

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingBottom: 30,
        backgroundColor: Colors.primaryBackground
    },
    keyboardAvoidingViewContainer: {
        backgroundColor: Colors.primaryBackground,
        justifyContent: "space-between",
    }
});
