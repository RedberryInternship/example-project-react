import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { BaseHeader,BaseButton, Pulse, CountDown, ChargingView  } from '../../../../src/components';
import { Const, Colors, Defaults } from '../../../../src/utils';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useChargingHook } from '../../../../src/hooks';


const charging = ({navigation} : any) => {
  const hook = useChargingHook(navigation)
  

    const [routes] = React.useState([
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]);
  
    const renderScene = ( {route} : any) => {
     return <ChargingView   hook={hook}  routeKey={route.key}/>
    };


    const renderTabBar = props => {
      console.log('====================================');
      console.log(props, " props, props");
      console.log('====================================');
    return (
      <TabBar
        {...props}
        contentContainerStyle={{backgroundColor:"red", height: 28}}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'black', borderWidth:1, height:28}}
        labelStyle={{fontSize:13, padding:0,color : "red",backgroundColor:"green", margin:0, elevation:10,  height:28}}
        tabStyle={{ backgroundColor: 'blue', borderWidth:1, height:28}}
      />
    );
  }
    
  return (
    <View style={[styles.container ]} >
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(charging,"MainDrawer")}
        title={"charging.charge"}
      />
      <TabView
        navigationState={{ index : hook.activeTab, routes :[{key: 'first', title: 'First'}, {key: 'second', title: 'second'}] }}
        renderScene={renderScene}
        onIndexChange={hook.changeActiveTab}
        lazy={true}
        renderTabBar={renderTabBar}
        initialLayout={Dimensions.get("window")}
      />
      

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground
  },
  
});

export default charging;
