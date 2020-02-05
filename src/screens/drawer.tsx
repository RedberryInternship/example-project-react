import React, {useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';


// import components
import {
  BaseButton,
  BaseLocaleButton,
  DrawerTextFieldItem,
  BaseUserAvatarWithLabel
} from '../components';

// import utils
import { Const, Colors, Defaults } from '../utils';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../App';
import { logOut } from '../../src/hooks/actions/rootActions';

const drawer = ({ navigation } : any) => {

  const {  i18n } = useTranslation();
  const insets = useSafeArea();
  const context : any = useContext(AppContext);

  const $isUserAuthorized = Defaults.token === '' || Defaults.token == null ? false : true;
  let $drawerListFields = null;
  let $drawerContent = null;

  if (!$isUserAuthorized) {
    $drawerListFields = Const.DrawerFieldsBeforeAuthorization.map((Field, ind) => {
      return <DrawerTextFieldItem
        key={ind}
        onPress={() => navigation.navigate(Field.route) }
        text={Field.text}
        image={Field.image}
        />;
    });

    $drawerContent = 
      <>
        <View style={{ flex: 0 }}>
          <BaseButton image={require("../../assets/images/icons/user.png")}
            onPress={() => navigation.navigate("Auth")}
            text={'home.authorization'}
            style={styles.drawerAuthBtn} />

          {$drawerListFields}
        </View>

        <View style={{ flex: 0, justifyContent:"flex-end" }}>
          
        </View>
      </>;
  }
  else {

    const $firstName = context.state.user.first_name;
    const $lastName = context.state.user.last_name;

    $drawerListFields = Const.DrawerFieldsAfterAuthorization.map((Field,key) => {
      return <DrawerTextFieldItem
        key={key} 
        onPress={() => navigation.navigate(Field.route) }
        text={Field.text}
        image={Field.image}
        badge={ Field.route === 'notifications' ? 1 : 0 } />
    })

    $drawerContent = 
      <View>
        <BaseUserAvatarWithLabel 
          onPress={()=>{Alert.alert("change icon")}}
          firstName={$firstName}
          lastName={$lastName} />
        {$drawerListFields}
      </View>;
  }

  return (
    <View style={[styles.safeAreaViewContainer, {paddingTop : insets.top, paddingBottom : insets.bottom}]}>
      <ScrollView 
        bounces={false}
        style={{ flex: 0}} 
        contentContainerStyle={{ flex: 0, flexGrow:1  , justifyContent: "space-between" }}>

        {$drawerContent}
        <View>
          {
            !$isUserAuthorized && <DrawerTextFieldItem
                    onPress={() => {Alert.alert("asfas")}}
                    text={'drawer.terms_and_conditions'}
                    image={require("../../assets/images/icons/green-tick.png")} />
          
          }
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:16}}>  
            <BaseLocaleButton
              onPress={() => { i18n.changeLanguage(i18n.language === 'ka' ? 'en' : 'ka') }}
              text={i18n.language === 'ka' ? 'Eng' : 'Ka'}
              style={styles.localeButton} 
            />
            <TouchableOpacity onPress={() =>{context.dispatch(logOut())}} >
                <Text style={{marginRight:24, color:"white"}}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
    marginLeft: 24,
    marginTop: 20,
    marginBottom: 20
  }
});

export default drawer;