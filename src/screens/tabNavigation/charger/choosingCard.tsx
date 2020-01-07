import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated
} from 'react-native';
import { BaseHeader,BaseButton, Pulse, CountDown, TitleTopLeftContainer, ChooseCardOnCharging  } from '../../../../src/components';
import { Const, Colors } from '../../../../src/utils';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useChoosingCard } from '../../../../src/hooks';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView} from "react-navigation"


enum Type {"viaPrice", "untilShoutDown"}

const draggableRange = { bottom:200, top:400}
const choosingCard = ({navigation} : any) => {
  
  const hook = useChoosingCard() 
  return (
    <View style={styles.container} >
      <BaseHeader 
        onPressLeft={navigation.navigate.bind(choosingCard,"MainDrawer")}
        title={"chooseCard.chooseCard"}
      />
      <LinearGradient colors={ ['#009AF022', '#1065E322']}  start={{x:0, y:1}} end={{x:1, y:0}} style={[styles.gradinetContainer]}>
        {
          navigation.getParam("type" , Type.untilShoutDown) === Type.untilShoutDown ? 
              <View style={{marginTop:"20%", paddingHorizontal:32, alignItems:"center"}}>

                <Image  source={require("../../../../assets/images/icons/check-circle.png")} style={{width:41, height:41, resizeMode:"contain",alignSelf:"center", marginVertical:16}}/>
                <Text>Here is the content inside panel</Text>

              </View>
            :
              <>
              </>
        }

      </LinearGradient>
      <SlidingUpPanel 
        ref={hook._panel}
        draggableRange={{ ...draggableRange}}
        snappingPoints={[draggableRange.top]}
        friction={0.5}
        animatedValue={hook._this.current?.animatedArrow}
        minimumDistanceThreshold={20}
      >
        <View style={styles.panelView}>
          <View>
          <Animated.Image 
            source={require("../../../../assets/images/icons/chevron-up.png") }  
            style={{width:64, height:40, resizeMode:"contain", alignSelf:"center", 
              transform : [
                {
                  rotateX: hook._this.current?.animatedArrow.interpolate({
                    inputRange:[ draggableRange.bottom, draggableRange.top],
                    outputRange: ["0deg", "180deg"]
                  })
                }
              ]
            }}
          />
          </View>
        <TitleTopLeftContainer
            direction={"column"}
            title={""}
            data={hook.defCard}
            onRenderItem={(val, index) =>(
              <ChooseCardOnCharging
                key={index}
                active={hook.activeCardIndex === index}
                onPress={hook.setActiveCard.bind(choosingCard ,index)}
                {...val}
              />
            )}
          />
        </View>
      </SlidingUpPanel>
      <View style={{width:"100%", backgroundColor:Colors.primaryBackground}}>
      <BaseButton
        onPress={navigation.navigate.bind(choosingCard,"Charging")}
        style={{marginTop: 16, marginVertical:16, marginHorizontal:0, alignSelf:"center", width : Const.Width-88}}
        text={"charger.turnOn"} 
        imageStyle={{tintColor:"white"}}
        image={require("../../../../assets/images/icons/ic_charge.png")}
      />
      <SafeAreaView style={{}} forceInset={{top:"never", bottom:"always"}} />

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
  },
  panelView : {
    borderRadius:16,
    backgroundColor:Colors.primaryDark,
    flex:1
  },
  gradinetContainer :{
    flex:1,
    marginHorizontal:16,
    marginTop:32,
    borderRadius:10
  }
});

export default choosingCard;
