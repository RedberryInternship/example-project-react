import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import colors from 'utils/colors'
import { BaseText } from 'components'
import { AddCardFC } from './types'

const BaseAddCardButton: AddCardFC = ({ onPress, style }) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <BaseText style={styles.title}>{t('settings.addCard')}</BaseText>
        <View style={styles.addCard}>
          <BaseText style={styles.addCardText}>+</BaseText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(BaseAddCardButton)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: 66,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingLeft: 32,
    paddingRight: 16,
  },
  title: {
    color: colors.primaryWhite,
  },
  addCard: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryBlue,
    color: colors.primaryWhite,
    borderRadius: 25,
  },
  addCardText: {
    color: colors.primaryWhite,
    fontSize: 25,
    marginLeft: 1,
    marginTop: -1,
  },
})
