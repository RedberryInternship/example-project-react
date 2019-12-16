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




  // generate drawer fields before auth
  const drawerData = Const.DrawerFieldsBeforeAuthorization;
  const DrawerFieldsBeforeAuthorization = drawerData.map(Field => {

    return <DrawerTextField
      onPress={() => undefined}
      text={Field.text}
      image={Field.image}
      key={Field.route} />;
  });


  // ======>  If User Is Not Authorized <======= \\

  const drawerBeforeAuth = <>
    <View style={{ flex: 0 }}>
      <StatusBar barStyle="dark-content" />

      <AuthBtn image={require("../../assets/images/icons/user.png")}
        onPress={() => undefined}
        text={'home.authorization'}
        style={styles.drawerAuthBtn} />

      {DrawerFieldsBeforeAuthorization}

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

 // ============================================== \\




// ======>  If User Is Authorized <======= \\

const drawerAfterAuth = <>

  <UserAvatarWithLabel />

</>


  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>

        {false ? drawerBeforeAuth : drawerAfterAuth}

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
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 20
  }
});

export default App;