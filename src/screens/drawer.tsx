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


  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={{flex:1}} contentContainerStyle={{flex:1, justifyContent:"space-between"}}>

          <View style={{ flex: 0 }}>
            <StatusBar barStyle="dark-content" />

            <AuthBtn image={require("../../assets/images/icons/user.png")}
              onPress={() => undefined }
              text={'home.authorization'}
              style={styles.drawerAuthBtn} />

            {DrawerFieldsBeforeAuthorization}

          </View>

          <View style={{ flex: 0 }}>
            <DrawerTextField
              onPress={() => undefined}
              text={'drawer.terms_and_conditions'}
              image={require("../../assets/images/icons/green-tick.png")} />
          </View>

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
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: Colors.primaryBackground
  },
  drawerAuthBtn: {
    width: Const.Width - 120,
    marginTop: 10,
    marginBottom: 60
  }
});

export default App;