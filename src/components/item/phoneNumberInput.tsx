import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { BaseInput } from "../"
import { Colors } from '../../../src/utils';

// eslint-disable-next-line react/display-name
const phoneNumberInput = React.forwardRef(({ onChangeText, onSubmit, text, onBlur, onFocus }: any, ref: any) => {
 
  const [animation] = useState(new Animated.Value(0))

  const _onChange = (e: any, show = true) => {

    show ? onFocus && onFocus(e) : onBlur && onBlur(e);

    Animated.timing(animation, {
      toValue: show ? 1 : 0,
      duration: 500,
    }).start()
  }

  const imageAnimatedOpacity = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={{ flex: 0, position: "relative" }}>
      <Animated.Image
        source={require("../../../assets/images/icons/phone.png")}
        style={[styles.image, {opacity: imageAnimatedOpacity }]}
        resizeMode="contain" />
      <BaseInput
        paddingLeft={64}
        keyboardType={"phone-pad"}
        onChangeText={onChangeText}
        onSubmit={onSubmit}
        value={text}
        onFocus={_onChange}
        onBlur={(e: any) => _onChange(e, false)}
        ref={ref}
        testID={"loginPhone"}
        title={"authentication.number"}
        returnKeyType={"send"}
      />
      <Animated.View style={{ position: "absolute", width: 53, height: 48, opacity: animation, bottom: 16 }}>
        <TouchableOpacity
          onPress={() => Alert.alert("sf")}
          style={styles.touchableStyle}
          hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}

        >
          <Text style={{ color: Colors.primaryGray, fontSize: 13 }}>+995</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});


export default phoneNumberInput;


const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    elevation: 1,
    backgroundColor: "#008AEE"
  },
  touchableStyle: {
    marginVertical: 4,
    borderRightWidth: 1,
    flex: 1,
    borderRightColor: "#9A99A255",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 24,
    flex: -1,
    height: 24,
    position: 'absolute',
    left: 13,
    bottom: 30,
    zIndex: 22,
    alignSelf: "center",
  }
});
