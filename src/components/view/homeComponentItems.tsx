
import React from 'react';
import { Alert} from 'react-native';
import { withNavigation} from 'react-navigation';
import { OnMapRoundButton, HomeFilterView, BaseButton, HomeMainInputView } from '..';
import { Defaults } from '../../../src/utils';


const App = ({navigation} :any) => {

  return (
      <>
        <OnMapRoundButton  
          style={{right:24, bottom: 138, backgroundColor:"#FFFFFF"}} 
          onPress={Defaults.modal.current.customUpdate.bind(App, true, {type:2})} 
          image={require('../../../assets/images/icons/ic_alert-circle.png')}
          imageStyle={{width:30,height:30}}
        />
        {
          // Defaults.token ?
          //   null
          // :
          <BaseButton 
            image={require("../../../assets/images/icons/user.png")}
            onPress={navigation.navigate.bind(App, "Auth")}
            text={'home.authorization'}
          />

        }
        <HomeMainInputView
          
        />
        <HomeFilterView />

      </>
  );
};


export default withNavigation(App);
