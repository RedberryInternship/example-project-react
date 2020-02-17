import React, {useRef, ReactElement} from 'react'
import {StyleSheet} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import {useSafeArea} from 'react-native-safe-area-context'

const {
  event,
  cond,
  set,
  eq,
  Value,
  add,
  block,
  Clock,
  or,
  and,
  greaterThan,
} = Animated

const distance = 200
enum PopupStatus {
  'OPENED' = 0,
  'CLOSED' = 1,
}
const MultiChargingTopModal = (): ReactElement => {
  const insets = useSafeArea()

  const _This = useRef({
    popupStatus: PopupStatus.OPENED,
    _dragY: new Value(0),
    _translateY: new Value(distance),
    _offsetY: new Value(0),
    _state: new Value(0),
    _clock: new Clock(),
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  })

  const _onGestureEvent = event(
    [
      {
        nativeEvent: {
          translationY: _This.current._dragY,
          state: _This.current._state,
        },
      },
    ],
    {useNativeDriver: true},
  )

  const _translateY = block([
    cond(
      or(
        eq(_This.current._state, State.ACTIVE),
        eq(_This.current._state, State.BEGAN),
      ),
      [
        cond(
          greaterThan(add(_This.current._offsetY, _This.current._dragY), 0),
          [add(_This.current._offsetY, _This.current._dragY)],
          [set(_This.current._offsetY, 0)],
        ),
      ],
      [
        cond(
          or(
            greaterThan(_This.current._dragY, 40),
            greaterThan(-40, _This.current._dragY),
          ),
          [
            cond(
              and(
                eq(_This.current.popupStatus, PopupStatus.CLOSED),
                greaterThan(_This.current._dragY, 0),
              ),
              [
                // set(_This.current.popupStatus, PopupStatus.OPENED),
                set(_This.current._offsetY, distance),
                // this.runTiming(_This.current._clock, 0, distance)
              ],
              [
                // set(this.popupStatus, PopupStatus[0]),
                set(_This.current._offsetY, 0),
                // this.runTiming(this._clock,this.distance, 0),
              ],
            ),
          ],
          [
            cond(
              eq(_This.current._offsetY, 0),
              [set(_This.current._offsetY, 0)],
              [set(_This.current._offsetY, distance)],
            ),
          ],
        ),
      ],
    ),
  ])

  return null
  return (
    <PanGestureHandler
      onGestureEvent={_onGestureEvent}
      // onGestureEvent={(ev)=>console.log(ev.nativeEvent)}
      onHandlerStateChange={_onGestureEvent}>
      <Animated.View
        style={[
          styles.mainPanResponderStyle,
          {height: 100 + insets.top, transform: [{translateY: _translateY}]},
        ]}></Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  mainPanResponderStyle: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 8,
    elevation: 13,
    flex: 1,
    backgroundColor: 'red',
    zIndex: 444,
  },
  mainContainer: {
    backgroundColor: '#023D63',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})

export default MultiChargingTopModal
