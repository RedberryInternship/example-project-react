/* eslint-disable react/prop-types */
import React from 'react'
import {
  View,
  Animated,
  PanResponder,
  Keyboard,
  StyleSheet,
  Easing,
  Alert,
} from 'react-native'

const PopupStatus = ['opened', 'closed']
export default class SwipeGesture extends React.PureComponent {
  state = {}
  popupStatus = 'closed'

  sliderRef = React.createRef()
  distance = parseFloat(this.props.height - this.props.minHeight)

  componentWillMount = () => {
    this.animatedValue = new Animated.Value(this.distance)

    this.PanResponder = PanResponder.create({
      onPanResponderGrant: (evt, gestureState) => {
        console.log('====================================')
        console.log(
          JSON.stringify(gestureState),
          this.sliderRef.current,
          'this.sliderRef.current',
          'onPanResponderGrant',
        )
        console.log('====================================')
      },

      onPanResponderMove: (evt, gestureState) => {
        const panY = gestureState.dy

        this.animatedValue.setValue(
          this.popupStatus === PopupStatus[1]
            ? this.distance + panY
            : panY > 0
            ? panY
            : 0,
        )

        this.sliderRef.current.setNativeProps({
          opacity: 0.5,
        })

        console.log('====================================')
        console.log(JSON.stringify(gestureState), 'onPanResponderMove')
        console.log('====================================')
      },

      onPanResponderRelease: (evt, gestureState) => {
        const x = gestureState.dx
        const y = gestureState.dy

        console.log('====================================')
        console.log(JSON.stringify(gestureState), 'onPanResponderRelease')
        console.log('====================================')

        if (Math.abs(x) > Math.abs(y)) {
          if (x >= 0) {
            this.props.onSwipePerformed('right')
          } else {
            this.props.onSwipePerformed('left')
          }
        } else {
          let status = ''
          if (y > 0) {
            if (y >= 40) {
              status = 'down'
              this.popupStatus = PopupStatus[1]
            } else {
              status = 'notEnough'
            }
          } else {
            if (y <= -40) {
              status = 'up'
              this.popupStatus = PopupStatus[0]
            } else {
              status = 'notEnough'
            }
          }
        }

        Animated.timing(this.animatedValue, {
          toValue: this.popupStatus === PopupStatus[1] ? this.distance : 0,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start()

        if (this.popupStatus === PopupStatus[1]) {
          this.props.onClose()
          // this.props.flatListRef.current.scrollToIndex({index :0, animated: false})
          Keyboard.dismiss()
        } else {
          this.props.onOpen()
        }
        this.sliderRef.current.setNativeProps({
          opacity: 1,
        })
      },

      onStartShouldSetPanResponder: (evt, gestureState) => {
        return false
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        return false
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const {dx, dy} = gestureState
        const touchThreshold = 0
        return Math.abs(dx) > touchThreshold || Math.abs(dy) > touchThreshold
      },

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: () => {
        Alert.alert('sd')
        return true
      },
      onShouldBlockNativeResponder: () => true,
    })
  }

  toggle = (func) => {
    Animated.timing(this.animatedValue, {
      toValue: this.popupStatus === PopupStatus[1] ? this.distance : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      func.bind(this, this.popupStatus), Keyboard.dismiss()
    })
  }
  render() {
    const {minHeight, height} = this.props

    // const translateY = this.animatedValue;

    const translateY = this.animatedValue
    //   .interpolate({
    //     inputRange: [0, screenHeight],
    //     outputRange: [ 0 , height ],
    //     extrapolate: 'clamp'
    // })

    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        collapsable={false}
        style={[
          styles.mainPanResponderStyle,
          {height, transform: [{translateY}]},
        ]}
      >
        <View style={styles.mainContainer}>
          <View
            ref={this.sliderRef}
            style={{
              backgroundColor: '#FFFFFF',
              width: 60,
              height: 4,
              borderRadius: 2,
              alignSelf: 'center',
              marginVertical: 8,
            }}
          />
          <View style={{width: '100%'}}>{this.props.children}</View>
        </View>
      </Animated.View>
    )
  }
}

const styles = new StyleSheet.create({
  mainPanResponderStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 8,
    elevation: 1,
  },
  mainContainer: {
    backgroundColor: '#023D63',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
