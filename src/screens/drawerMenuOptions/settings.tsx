import React, { useContext } from 'react'
import {
    View,
    StyleSheet
} from 'react-native';
import { AppContext } from '../../../App';

// components
import {
    BaseHeader,
    SettingsListItem
} from '../../components';

// utils
import { Colors, Const } from '../../utils'
import { ScrollView } from 'react-native-gesture-handler';

const settings = ({ navigation }: any) => {
    const $settingsInfo = helpers.makeSettingsInfo();

    const SettingsListItems = Const.SettingsListFields.map((Item, key) => {
        const $value = helpers.makeValue(key, $settingsInfo);

        return <SettingsListItem
            name={Item.name}
            onPress={() => navigation.navigate("ProfileChange", {
                type: Item.type,
                name: Item.editableComponentName,
                value: $value

            })}
            key={Item.type}
            image={Item.image}
            value={$value}
            confirmed={helpers.isValueAdded(key, $settingsInfo)}
            valueColor={helpers.determineColor(key, $settingsInfo)}
        />
    });

    return (
        <View style={styles.container}>
            <BaseHeader
                onPressLeft={navigation.navigate.bind(settings, "MainDrawer")}
                title={"settings.settings"}
            />
            <ScrollView style={{ flex: 1 }}>

                <View style={styles.listItemsContainer}>
                    {SettingsListItems}
                </View>
            </ScrollView>

        </View>
    );
};

export default settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBackground
    },
    listItemsContainer: {
        marginTop: 35
    }
});


type SettingsInfoType = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    cardExists: boolean | string,
    password: string
}

type SettingsValuesType = {
    value: any
}

const helpers = {
    structurizeSettingsInfoObj: (): SettingsInfoType => {

        const context: any = useContext(AppContext);

        const activeCardNumber = "********* 9281";

        const $isContextLoaded = context && context.state && context.state.user;

        return {
            firstName: $isContextLoaded ? context.state.user.first_name : "",
            lastName: $isContextLoaded ? context.state.user.last_name : "",
            email: $isContextLoaded ? context.state.user.email : "",
            phone: $isContextLoaded ? context.state.user.phone_number : "",
            cardExists: activeCardNumber || false,
            password: '*********'
        }
    },
    makeSettingsInfo: () => {

        const info = helpers.structurizeSettingsInfoObj();

        const settingsInfo = [
            {
                value: info.firstName
            },
            {
                value: info.lastName
            },
            {
                value: info.email
            },
            {
                value: info.phone
            },
            {
                value: info.cardExists
            },
            {
                value: info.password
            }
        ];

        return settingsInfo;
    },

    makeValue: (key: number, SettingsInfo: Array<SettingsValuesType>) => {
        
        if(!SettingsInfo) return false;
        const field = SettingsInfo[key].value;

        if (helpers.isFieldEmail(key) && helpers.isFieldEmpty(field)) {
            return 'settings.notAdded';
        }

        if (helpers.isFieldCard(key) && helpers.isFieldEmpty(field)) {
            return 'settings.notAdded';
        }

        return field.toString();
    },

    isValueAdded: (key: number, SettingsInfo: Array<SettingsValuesType>): boolean => {

        if(!SettingsInfo) return false;

        const field = SettingsInfo[key].value;

        const emailFieldDetermination = helpers.isFieldEmail(key) && helpers.isFieldEmpty(field);
        const cardFieldDetermination = helpers.isFieldCard(key) && helpers.isFieldEmpty(field);

        return emailFieldDetermination || cardFieldDetermination;

    },
    determineColor: (key: number, SettingsInfo: Array<SettingsValuesType>) => {
        if(!SettingsInfo) return Colors.primaryWhite;
        
        if(helpers.isFieldPassword(key)){
            return Colors.primaryGray;
        }

        if(helpers.isFieldCard(key)){
            if(!helpers.isFieldEmpty(SettingsInfo[key].value)){
                return Colors.primaryGray;
            }
        }

        return Colors.primaryWhite;
    },

    isFieldEmail: (key: number): boolean => {
        return key === 2;
    },
    isFieldCard: (key: number): boolean => {
        return key === 4;
    },
    isFieldPassword: (key: number): boolean => {
        return key === 5;
    },
    isFieldEmpty: (el: any): boolean => {
        return typeof el !== 'string' || el === '';
    }
}