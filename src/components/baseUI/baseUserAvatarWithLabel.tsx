import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';


import { Colors, Const } from '../../utils';


const userAvatarWithLabel = () => {


    const userIcon = require('../../../assets/images/icons/green-user.png');

    return <View style={[styles.container]}>
                <View style={[styles.itemsWrapper]}>
                    
                    <View style={styles.imageContainer}>
                        <Image source={userIcon} style={styles.image} />

                        <View style={styles.editButton}>
                            <Image 
                                source={require('../../../assets/images/icons/blue-pencil.png')}
                                style={styles.editButtonImage} />
                        </View>

                    </View>

                    <View>
                        <Text>მერაბ სეფაშვილი</Text>
                    </View>
                </View>
        </View>;
}

export default userAvatarWithLabel;


const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:150,
        backgroundColor: Colors.primaryDark,
        alignItems: "center",
        justifyContent: "center"
    },
    itemsWrapper:{
        flexDirection:"row"
    },

    imageContainer: {
        width: undefined,
        height: undefined,
        backgroundColor: "rgba(76, 217, 100, .2)",
        borderRadius: 50,
        position: "relative"
    },
    image:{
        width: 50,
        height: 50,
        margin:10
    },


    editButton: {
        position:"absolute",
        backgroundColor: Colors.primaryDark,
        width: 25,
        height: 25,
        zIndex:1,
        borderRadius: 50,
        borderColor: Colors.primaryBlue,
        borderWidth: 1,
        right:0,
        alignItems:"center",
        justifyContent: "center"
    },
    editButtonImage:{
        width:"60%",
        height:"60%",
        position:"relative",
        top:-1
    }
});