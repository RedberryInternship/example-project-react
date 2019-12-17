import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Alert,
  FlatList
} from 'react-native';

// import components
import AuthBtn from '../components/baseUI/baseButton';
import DrawerTextField from '../components/item/drawerTextFieldItem';
import BaseLocaleButton from '../components/baseUI/baseLocaleButton';
import UserAvatarWithLabel from '../components/baseUI/baseUserAvatarWithLabel';

// import utils
import { Const, Colors } from '../utils';

const App = () => {


  const $isUserAuthorized = true;
  let $drawerListFields = null;
  let $drawerContent = null;

  if (!$isUserAuthorized) {
    $drawerListFields = Const.DrawerFieldsBeforeAuthorization.map(Field => {

      return <DrawerTextField
        onPress={() => undefined}
        text={Field.text}
        image={Field.image}
        key={Field.route} />;
    });

    $drawerContent = <>
      <View style={{ flex: 0 }}>
        <StatusBar barStyle="dark-content" />

        <AuthBtn image={require("../../assets/images/icons/user.png")}
          onPress={() => undefined}
          text={'home.authorization'}
          style={styles.drawerAuthBtn} />

        {$drawerListFields}
      </View>

      <View style={{ flex: 0 }}>
        <DrawerTextField
          onPress={() => undefined}
          text={'drawer.terms_and_conditions'}
          image={require("../../assets/images/icons/green-tick.png")} />

        <BaseLocaleButton
          onPress={() => Alert.alert("მე ვარ მეფე მზე!")}
          text="Eng"
          style={styles.localeButton} />
      </View>
    </>;
  }
  else {

    $drawerListFields = Const.DrawerFieldsAfterAuthorization.map(Field => {
      return <DrawerTextField
        onPress={() => undefined}
        text={Field.text}
        image={Field.image}
        badge={ Field.route === 'notifications' ? 1 : 0 } />
    })

    $drawerContent = <>
      <View>
        <UserAvatarWithLabel />
        {$drawerListFields}
      </View>

      <BaseLocaleButton
        onPress={() => Alert.alert("მე ვარ მეფე მზე!")}
        text="Eng"
        style={styles.localeButton} />
    </>;
  }



  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>

        {$drawerContent}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.primaryBackground
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  drawerAuthBtn: {
    width: Const.Width - 120,
    marginTop: 10,
    marginBottom: 60
  },
  localeButton: {
    marginLeft: 38,
    marginTop: 40,
    marginBottom: 20
  }
});

export default App;