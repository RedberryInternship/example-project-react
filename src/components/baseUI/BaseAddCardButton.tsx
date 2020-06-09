import React, {ReactElement} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {BaseText} from 'components'

type AddCard = {
  onPress: () => void | null
}

const BaseAddCardButton = ({onPress}: AddCard): ReactElement => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
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
    backgroundColor: Colors.primaryDark,
    height: 66,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 31,
  },
  title: {
    color: Colors.primaryWhite,
  },
  addCard: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBlue,
    color: Colors.primaryWhite,
    borderRadius: 25,
  },
  addCardText: {
    color: Colors.primaryWhite,
    fontSize: 25,
    marginLeft: 1,
    marginTop: -2,
  },
})
