import React, {ReactElement, useCallback, useContext} from 'react'
import {View, StyleSheet} from 'react-native'

import {ScreenPropsWithNavigation} from '../../../@types/allTypes'

import {BaseHeader, BaseButton, CardAddView} from 'components'
import {Colors} from 'utils'

import {AppContext} from '../../../App'
import {AppContextType} from 'allTypes'
import {updateUser} from 'hooks/actions/rootActions'

const CardAdd = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {dispatch}: AppContextType = useContext(AppContext)

  const onSuccess = useCallback(() => {
    updateUser(dispatch)
    navigation.goBack()
  }, [navigation])

  return (
    <View style={styles.container}>
      <BaseHeader title={'settings.addCard'} onPressLeft={navigation.goBack} />
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
