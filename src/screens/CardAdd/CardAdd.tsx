import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { BaseHeader, CardAddView } from 'components'
import colors from 'utils/colors'
import { refreshUserData } from 'state/actions/userActions'
import { FCWithNavigation } from 'types'

const CardAdd: FCWithNavigation = ({ navigation }) => {
  const dispatch = useDispatch()

  const onSuccess = useCallback(() => {
    dispatch(refreshUserData())
    navigation.goBack()
  }, [navigation])

  return (
    <View style={styles.container}>
      <BaseHeader title="settings.addCard" onPressLeft={navigation.goBack} />
      <CardAddView onSuccess={onSuccess} />
    </View>
  )
}

export default CardAdd

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: colors.primaryBackground,
  },
})
