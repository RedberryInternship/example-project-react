import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';


import {
  BaseButton
} from '..';

import { Colors } from '../../utils'



type FavouriteChargerItem = {
  title: string,
  address: string,
  turnon: (event ?: GestureResponderEvent ) => void | undefined,
  deleteItem: (event ?: GestureResponderEvent ) => void | undefined
}


const favouriteChargerListItem = ({ title, address, turnon, deleteItem }: FavouriteChargerItem) => {

  return (
    <View style={styles.container}>

      <View style={styles.innerLeftContainer}>

        <TouchableOpacity onPress={ deleteItem }>
          <View style={styles.deleteButton}>
            <Image style={styles.deleteButtonImage}
              source={require('../../../assets/images/icons/orange-trash.png')} />
          </View>
        </TouchableOpacity>


        <Text style={styles.title}>{title}</Text>

        <View style={styles.addressContainer}>
          <Image style={styles.addressImage}
            source={require('../../../assets/images/icons/ic_map_pin.png')} />
          <Text style={styles.addressTitle}>{address}</Text>
        </View>

      </View>

      <BaseButton
        onPress={turnon}
        text={"turnOn"}
        style={styles.customizedBaseButton}
        imageStyle={{ tintColor: Colors.primaryBlue }}
        image={require("../../../assets/images/icons/arrow_right.png")}
        textStyle={{ color: Colors.primaryBlue }}
      />

    </View>
  );
}

export default favouriteChargerListItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryDark,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 21,
    marginRight: 11,

    paddingHorizontal: 11,
    paddingTop: 9,
    paddingBottom: 18,
    borderRadius: 8
  },

  innerLeftContainer: {
    flexDirection: "column"
  },
  customizedBaseButton: {
    marginTop: 0,
    marginHorizontal: 0,
    alignSelf: "center",
    width: 120,
    backgroundColor: "#0199F033"
  },
  deleteButton: {
    backgroundColor: "rgba(255, 149, 0, 0.16)",
    width: 39,
    height: 39,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonImage: {
    width: 10.5,
    height: 15
  },
  addressContainer: {
    flexDirection: "row"
  },
  addressImage: {
    width: 17,
    height: 17,
    marginRight: 10
  },
  addressTitle: {
    color: Colors.primaryGray,
    fontSize: 13
  },
  title: {
    color: Colors.primaryWhite,
    lineHeight: 30,
    fontSize: 15
  }
});