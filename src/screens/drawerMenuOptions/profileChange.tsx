import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';


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

    switch ($type) {
        case "FirstnameChange":
            $editView = <FirstnameChangeView {...$payload} />;
            break;

        case "LastnameChange":
            $editView = <LastnameChangeView {...$payload} />;
            break;

        case "CardChange":
            $editView = <CardChangeView {...$payload} />;
            break;

        case "MailChange":
            $editView = <MailChangeView {...$payload} />;
            break;

        case "PhoneChange":
            $editView = <PhoneChangeView {...$payload} />;
            break;
        case "PasswordChange":
            $editView = <PasswordChangeView {...$payload} />;
    }


    return (
        <View style={styles.container} >
            <View>
                <BaseHeader
                    title={$headerName}
                    onPressLeft={() => navigation.goBack()} />
                {$editView}
            </View>

            <BaseButton 
                onPress={() => undefined}
                text="save"
                image={require("../../../assets/images/icons/arrow_left.png")}
                isImageRight={true} />
        </View>
    );
}


export default profileChange;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground,
        justifyContent:"space-between",
        paddingBottom: 50
    }
});