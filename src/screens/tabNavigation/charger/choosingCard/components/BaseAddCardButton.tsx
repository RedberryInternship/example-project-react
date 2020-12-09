import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'utils'
import { BaseText } from 'components'
import { AddCardButtonFC } from 'screens/tabNavigation/charger/choosingCard/types'

const BaseAddCardButton: AddCardButtonFC = ({ onPress, style }) => {
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
    height: 66,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingLeft: 32,
    paddingRight: 32,
  },
  title: {
    color: Colors.primaryWhite,
  },
  addCard: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBlue,
    color: Colors.primaryWhite,
    borderRadius: 14,
  },
  addCardText: {
    color: Colors.primaryWhite,
    fontSize: 25,
    marginLeft: 1,
    marginTop: -1,
  },
})
