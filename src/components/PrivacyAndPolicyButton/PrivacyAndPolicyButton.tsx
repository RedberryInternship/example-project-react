import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { withTranslation } from 'react-i18next'
import colors from 'utils/colors'
import {
  Props,
  State,
} from './types'

class PrivacyAndPolicyButton extends Component<Props, State> {
  render() {
    const {
      onPress,
      t,
    } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={style.buttonContainer}>
          <Text style={style.text}>{t('IAgree')}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withTranslation()(PrivacyAndPolicyButton);

const style = StyleSheet.create(
  {
    buttonContainer: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 3,
    },
    text: {
      color: colors.primaryWhite,
      letterSpacing: 0.5,
    },
  },
)
