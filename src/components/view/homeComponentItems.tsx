
import React, {useContext} from 'react';
import { withNavigation} from 'react-navigation';
import { OnMapRoundButton, HomeFilterView, BaseButton, HomeMainInputView } from '..';
import { Defaults } from '../../../src/utils';
import { HomeContext } from '../../../src/screens/tabNavigation/home';


const App = ({navigation} :any) => {

  const context : any = useContext(HomeContext)
  return (
      <>
        <OnMapRoundButton  
          style={{right:24, bottom: 138, backgroundColor:"#FFFFFF"}} 
          onPress={Defaults.modal.current && Defaults.modal.current.customUpdate.bind(App, true, {type:2})} 
          image={require('../../../assets/images/icons/ic_alert-circle.png')}
          imageStyle={{width:30,height:30}}
        />
        
        <OnMapRoundButton  
          style={{right:24, top: Defaults.token ? 90 : 140, backgroundColor:"#FFFFFF"}} 
          onPress={context.state.LocationRequestFunc} 
          image={require('../../../assets/images/icons/ic_alert-circle.png')}
          imageStyle={{width:30,height:30}}
        />
        {
          Defaults.token ?
            null
          :
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
