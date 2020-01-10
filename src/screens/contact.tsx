import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar
} from 'react-native';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTranslation } from 'react-i18next'

// components
import {
  BaseHeader,
  BaseButton,
  ContactListItem
} from '../components';

// utils
import {
  Colors,
  Const
} from '../utils';
import { SafeAreaView } from 'react-navigation';

const contact = ({ navigation }: any) => {


  const { t } = useTranslation();
  const [message, setMessage] = useState();

  const listItems = Const.ContactListFields.map((el, key) => {

    return <ContactListItem
      key={el.name}
      image={el.image}
      name={el.name}
      value={contactInfos[key]}
      style={key !== 4 ? null : { borderBottomWidth: 0 }} />
  });


  const sendMessage = ( msg : string ) => {
    Alert.alert("", msg, [ {text: "Got It!", onPress: () => navigation.goBack() } ] );
  }


  return (
    <View style={styles.container}>
      <BaseHeader
        title={'contact.contact'}
        onPressLeft={() => navigation.goBack()} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.select({ios: -300, android: 150})}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        contentContainerStyle={{flex:0}}
        overScrollMode = {"always"}
        extraHeight={Platform.select({ios: 500, android: 75})}
        // keyboardDismissMode={"on-drag"}
        resetScrollToCoords={{ x: 0, y: 0 }} >
        <View style={styles.contactItemsContainer}>
          {listItems}
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>{t("contact.message")}</Text>
          <Image source={require("../../assets/images/icons/mail.png")} style={styles.messageIcon} />
          <TextInput 
            multiline={true} 
            style={styles.message} 
            onChangeText={(text) => setMessage(text)} 
            numberOfLines={4}
          />
        </View>
      </KeyboardAwareScrollView>


      <KeyboardAvoidingView 
        behavior="padding" 
        // contentContainerStyle={{ flex: 1 }} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 16 : StatusBar.currentHeight}>
        <BaseButton
          onPress={() => sendMessage(message)}
          text="save"
          image={require("../../assets/images/icons/arrow_left.png")}
          style={{marginTop:0, marginBottom:16}}
          isImageRight={true} />
      </KeyboardAvoidingView>
      <SafeAreaView />
    </View>
  );
}

export default contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    // paddingBottom: 32
  },
  contactItemsContainer: {
    backgroundColor: Colors.secondaryGray,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 32,
    marginTop: 32
  },
  messageContainer: {
    marginHorizontal: 16,
    marginVertical: 32,
    position: "relative",
  },
  messageTitle: {
    color: Colors.primaryGray,
    marginBottom: 16
  },
  messageIcon: {
    position: "absolute",
    zIndex: 1,
    width: 24,
    height: 24,
    top: 40,
    left: 8
  },
  message: {
    height: 200,
    backgroundColor: Colors.black,
    borderRadius: 8,
    color: Colors.primaryWhite,
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 10,
    textAlignVertical:"top",
    
  }
});

const contactInfos = [
  "საირმის ქუჩა 11ო",
  "+995 591 93 50 80",
  "gela@espace.ge",
  "e-space",
  "www.espace.ge"
];