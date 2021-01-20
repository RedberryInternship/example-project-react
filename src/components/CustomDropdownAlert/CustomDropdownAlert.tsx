import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import defaults from 'utils/defaults'
import { CustomDropDownFC } from './types'

const CustomDropdownAlert: CustomDropDownFC = (
  {
    dropDownInactiveBarColor,
  },
) => (
  <DropdownAlert
    translucent
    useNativeDriver
    inactiveStatusBarBackgroundColor="transparent"
    onClose={() => StatusBar.setBarStyle(dropDownInactiveBarColor(), true)}
    ref={(ref) => { defaults.dropdown = ref }}
    testID="dropdownAlert"
    titleStyle={styles.dropdownAlertTitleStyle}
    imageStyle={styles.dropdownAlertImageStyle}
    titleNumOfLines={2}
  />
)

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
