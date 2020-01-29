import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';
import { BaseHeader,BaseButton, Pulse, CountDown, ChargingView  } from '../../../../src/components';
import { Const, Colors, Defaults } from '../../../../src/utils';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useChargingHook } from '../../../../src/hooks';
import Animated from 'react-native-reanimated';


const charging = ({navigation} : any) => {
  const hook = useChargingHook(navigation)
  

    const [routes] = React.useState([
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]);
  
    const renderScene = ( {route} : any) => {
     return <ChargingView   hook={hook}  routeKey={route.key}/>
    };


    const renderTabBar = (props : any) => {
      console.log('====================================');
      console.log(props, " props, props");
      console.log('====================================');
      const inputRange = props.navigationState.routes.map((x, i) => i);

      return (
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const color = Animated.color(
              Animated.round(
                Animated.interpolate(props.position, {
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex !== i ? 255 : 0
                  ),
                })
              ),
              230,
              130
            );
            const backgroundColor = Animated.color(
              Animated.round(
                Animated.interpolate(props.position, {
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex !== i ? 255 : 0
                  ),
                })
              ),
              230,
              130
            );

            return (
              <TouchableOpacity
                key={i}
                style={[styles.tabItem, {borderRightWidth: props.navigationState.routes.length -1 !== i ? 1 : 0}]}
                onPress={() => hook.changeActiveTab(i)}>
                <Animated.Text style={{ color  }}>{route.title}</Animated.Text>
              </TouchableOpacity>
            );
          })}
      </View>
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
  tabBar: {
    flexDirection: 'row',
    borderWidth:1,
    borderColor:Colors.primaryBlue,
    borderRadius:4,
    marginHorizontal:16,
    marginTop:16
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderWidth:0,
    borderColor:Colors.primaryBlue,
    height:28,
    justifyContent:"center"
  },
});

export default charging;
