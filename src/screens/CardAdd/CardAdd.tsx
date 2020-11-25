import React, { ReactElement, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { BaseHeader, CardAddView } from 'components'
import { Colors } from 'utils'
import { refreshUserData } from 'state/actions/userActions'
import { ScreenPropsWithNavigation } from '../../../@types/allTypes'

const CardAdd = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
  const dispatch = useDispatch()

  const onSuccess = useCallback(async () => {
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
    backgroundColor: Colors.primaryBackground,
  },
  innherContainer: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  keyboardAvoidingViewContainer: {
    backgroundColor: Colors.primaryBackground,
    justifyContent: 'space-between',
  },
})
