import React from 'react'
import { StyleSheet } from 'react-native'
import BaseText from 'components/BaseText'
import colors from 'utils/colors'
import { useTranslation } from 'react-i18next'

const PasswordRulesLabel = () => {
  const { t } = useTranslation()

  return (
    <BaseText style={styles.text}>{t('dropDownAlert.registration.minPasswordLength')}</BaseText>
  )
}

export default PasswordRulesLabel

const styles = StyleSheet.create(
  {
    text: {
      color: colors.primaryGold,
      position: 'relative',
      bottom: 15,
    },
  },
)
