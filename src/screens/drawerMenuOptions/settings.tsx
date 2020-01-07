import React from 'react'
import {
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';

// components
import {
    BaseHeader,
    SettingsListItem
} from '../../components';

// utils
import { Colors, Const } from '../../utils'
import { ScrollView } from 'react-native-gesture-handler';

const settings = ({ navigation }: any) => {


    const SettingsListItems = Const.SettingsListFields.map((Item, key) => {

        const $isConfirmable = (key === 3 || key === 4 || key === 5) ? true : false;
        let $value;

        if ($isConfirmable) {
            $value = SettingsInfo[key].value ? 'settings.confirmed' : 'settings.notconfirmed';
        }
        else {
            $value = SettingsInfo[key].value.toString();
        }


        return <SettingsListItem
            name={Item.name}
            onPress={() => navigation.navigate("ProfileChange",{
                type: Item.type,
                name: Item.editableComponentName  
            })}
            key={Item.type}
            image={Item.image}
            value={$value}
            confirmed={$isConfirmable ? SettingsInfo[key].value : null}
            valueColor={($isConfirmable && SettingsInfo[key].value) ? Colors.primaryGreen : Colors.primaryWhite}
        />
    });

    return (
        <>
        <SafeAreaView style={styles.container}>
        <BaseHeader
                    onPressLeft={navigation.navigate.bind(settings, "MainDrawer")}
                    title={"settings.settings"}
                />
            <ScrollView style={{flex:1}}>
                
                <View style={styles.listItemsContainer}>
                    {SettingsListItems}
                </View>
            </ScrollView>

        </SafeAreaView>
        </>
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


export const SettingsInfo = [
    {
        value: "მერაბ"
    },
    {
        value: "სეფაშვილი"
    },
    {
        value: "hemigmirigicode@mail.ru"
    },
    {
        value: true
    },
    {
        value: false
    },
    {
        value: true
    }
]