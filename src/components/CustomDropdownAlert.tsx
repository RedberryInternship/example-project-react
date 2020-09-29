import React from 'react'
import { StyleSheet, StatusBar, StatusBarStyle } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import Defaults from 'utils/defaults'

type CustomDropDownProps = {
  dropDownInactiveBarColor: () => StatusBarStyle
}

const CustomDropdownAlert = ({
  dropDownInactiveBarColor,
}: CustomDropDownProps) => {
  return (
    <DropdownAlert
      translucent={true}
      useNativeDriver={true}
      inactiveStatusBarBackgroundColor={'transparent'}
      onClose={() => StatusBar.setBarStyle(dropDownInactiveBarColor(), true)}
      ref={(ref) => (Defaults.dropdown = ref)}
      testID={'dropdownAlert'}
      titleStyle={styles.dropdownAlertTitleStyle}
      imageStyle={styles.dropdownAlertImageStyle}
      titleNumOfLines={2}
    />
  )
}

export default CustomDropdownAlert

const styles = StyleSheet.create({
  dropdownAlertTitleStyle: {
    fontSize: 14,
    color: 'white',
  },
  dropdownAlertImageStyle: {
    marginHorizontal: 8,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
})
