import React from 'react'

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import {useTranslation} from 'react-i18next'
import {Colors} from 'utils'

// import {Colors} from 'utils'

type AddCard = {
  onPress: () => void | null
}

const baseAddCardButton = ({onPress}: AddCard) => {
  const {t} = useTranslation()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('settings.addCard')}</Text>

        <View style={styles.addCard}>
          <Text style={styles.addCardText}>+</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default baseAddCardButton

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
