import React, {ReactElement} from 'react'

import {View, StyleSheet, Image} from 'react-native'

type BaseCheckboxProp = {
  active: boolean
}

const BaseCheckbox = ({active}: BaseCheckboxProp): ReactElement => {
  return (
    <View style={styles.checkboxImageContainer}>
      <Image
        source={
          active
            ? require('../../../assets/images/icons/green_checkmark.png')
            : require('../../../assets/images/icons/cicle.png')
        }
        style={styles.checkBoxImage}
      />
    </View>
  )
}

export default BaseCheckbox

const styles = StyleSheet.create({
  checkboxImageContainer: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
})
