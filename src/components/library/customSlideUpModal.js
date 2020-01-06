/* eslint-disable react/prop-types */
import React from 'react';
import { View,Animated, PanResponder, Keyboard, Platform, StyleSheet, Easing, Alert } from 'react-native';



const PopupStatus = ["opened","closed"]
export default class SwipeGesture extends React.PureComponent {

  state={
    
  }
  popupStatus = "closed";

  sliderRef = React.createRef()
  distance =  parseFloat( this.props.height - this.props.minHeight);

  componentWillMount = () => {
      let valueY;
      this.animatedValue = new Animated.Value(this.distance)

      this.PanResponder = PanResponder.create({

        onPanResponderGrant: (evt, gestureState) => {

          console.log('====================================');
          console.log( JSON.stringify( gestureState),this.sliderRef.current,"this.sliderRef.current", "onPanResponderGrant" );
          console.log('====================================');
          valueY = gestureState.dy;
        },


        onPanResponderMove: (evt, gestureState) => {

          // console.log('====================================');
          // console.log(JSON.stringify( gestureState), "onPanResponderMove" );
          // console.log('====================================');

          // let panY = valueY + gestureState.dy;
          let panY = gestureState.dy;
          let x = gestureState.dx;
          let y = gestureState.dy;
          if (Math.abs(x) > Math.abs(y)) {
            //aq ar vici ikneb vknat rame
          } else {
            this.props.onSwipePerformed( 'moving', panY )
          }

          this.animatedValue.setValue(this.popupStatus === PopupStatus[1] ? this.distance  + panY :  panY>0 ?  panY : 0)

          this.sliderRef.current.setNativeProps({
            opacity : 0.5
          })

          return true;
        },

        onPanResponderRelease: (evt, gestureState) => {
          let x = gestureState.dx;
          let y = gestureState.dy;


          console.log('====================================');
          console.log( JSON.stringify( gestureState), "onPanResponderRelease" );
          console.log('====================================');

          if (Math.abs(x) > Math.abs(y)) {
              if (x >= 0) {
                this.props.onSwipePerformed('right')
              } else {
                this.props.onSwipePerformed('left')
              }
          } else {
            let status = "";
            if(y > 0){
              if (y >= 40) {
                status='down'
                this.popupStatus = PopupStatus[1]
              } else {
                status='notEnough'
              }
            }
            else {
              if (y <= -40) {
                status='up'
                this.popupStatus = PopupStatus[0]
              } else {
                status='notEnough'
              }
            }
          }

          Animated.timing(this.animatedValue, {
            toValue : this.popupStatus === PopupStatus[1] ? this.distance : 0,
            duration:200,
            easing : Easing.out(Easing.ease),
            useNativeDriver:true
          }).start()

          if(this.popupStatus === PopupStatus[1]){
            this.props.onClose()
            // this.props.flatListRef.current.scrollToIndex({index :0, animated: false})
            Keyboard.dismiss()
          } 
          else {
            this.props.onOpen()
          }
          this.sliderRef.current.setNativeProps({
            opacity : 1
          })
          return true;
        },

        onStartShouldSetPanResponder: (evt, gestureState) => {
          console.log('====================================');
          console.log( evt.nativeEvent, this.props._this.current.scrollPositionStatus, gestureState, "evt, onStartShouldSetPanResponder");
          console.log('====================================');
          if( this.popupStatus === "closed" ) return true

          // if(evt.nativeEvent.locationX <32  ) return true
          return  true
        },
        // onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        //   console.log('====================================');
        //   console.log( evt.nativeEvent, this.props._this.current.scrollPositionStatus, gestureState, "evt, onStartShouldSetPanResponderCapture");
        //   console.log('====================================');
        //   return this.props._this.current.scrollPositionStatus === 0 ? true : false
        // },
        onMoveShouldSetPanResponder: (evt, gestureState) => {

          // let dy = gestureState.dy;
          // let scrollYStatus = this.props._this.current.scrollPositionStatus;


          // console.log('====================================');
          // console.log( evt.nativeEvent,scrollYStatus, gestureState, "evt, onMoveShouldSetPanResponder");
          // console.log('====================================');
          
          // if( (this.popupStatus === "closed"  && dy < 0) || (scrollYStatus ===0 && dy > 0) ){
          //   this.props.flatListRef.current.setNativeProps({
          //     onMoveShouldSetPanResponder : true,
          //     scrollEnabled : true,
          //   })
          //   return true
          // }

          // if(evt.nativeEvent.locationX <32  ) {
          //   console.log('====================================');
          //   console.log("Asd");
          //   console.log('====================================');
          //   return true
          // }

          // this.props.flatListRef.current.setNativeProps({
          //   onMoveShouldSetPanResponder : true,
          //   scrollEnabled : true,
          // })

          return false

        },
        // onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderTerminate: (evt, gestureState) => false,
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return false;
        },
        onResponderTerminationRequest: () => false,

      });
  };

  toggle = (func) => {
    Animated.timing(this.animatedValue, {
      toValue : this.popupStatus === PopupStatus[1] ? this.distance : 0,
      duration:200,
      easing : Easing.out(Easing.ease),
      useNativeDriver:true
    }).start(() => {func.bind(this, this.popupStatus), Keyboard.dismiss() })

  }
  render() {

    const {minHeight, height } = this.props;

    // const translateY = this.animatedValue; 

    const translateY = this.animatedValue
  //   .interpolate({
  //     inputRange: [0, screenHeight],
  //     outputRange: [ 0 , height ],
  //     extrapolate: 'clamp'
  // })

      return (
          <Animated.View {...this.PanResponder.panHandlers} style={[styles.mainPanResponderStyle,{ height, transform : [{translateY}] }]}>
            <View style={styles.mainContainer}>
              <View 
                ref={this.sliderRef}
                style={{
                  backgroundColor:'#FFFFFF',
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  alignSelf:"center",
                  marginVertical : 8
                }}
              />
              <View style={{width:"100%"}}>
                {this.props.children}
              </View>
            </View> 
          </Animated.View>
      )
  }
}

const styles= new StyleSheet.create({
  mainPanResponderStyle :  {
    width:"100%", 
    position: "absolute",
    bottom:0,
    left:0,
    paddingHorizontal:8,
    elevation:1,
  },
  mainContainer : {
    backgroundColor:"#023D63",
    flex:1,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,

  }
})