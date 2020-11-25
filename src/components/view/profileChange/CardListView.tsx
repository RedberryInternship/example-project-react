import React, { ReactElement } from 'react'
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  withNavigation,
} from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import CardListItem from 'components/item/CardListItem'
import BaseAddCardButton from 'components/baseUI/BaseAddCardButton'
import { refreshUserData } from 'state/actions/userActions'
import services from 'services'
import {
  DisplayDropdownWithError,
  remoteLogger,
} from 'helpers/inform'

type CardListViewProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
const CardListView = ({ navigation }: CardListViewProps): ReactElement => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const updateUserHandler = async (val) => {
    try {
      val && (await services.setDefaultCard(val.id))
      dispatch(refreshUserData())
    } catch (error) {
      remoteLogger(error)
      DisplayDropdownWithError()
    }
  }

  return (
    <View style={styles.container}>
      {user?.user_cards.map((val) => (
        <CardListItem
          key={val.id}
          code={val.masked_pan}
          selected={!!val.default}
          onPress={() => updateUserHandler(val)}
        />
      ))}
      <BaseAddCardButton
        onPress={() => {
          navigation.navigate('CardAdd')
        }}
      />
    </View>
  )
}

export default withNavigation(CardListView)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 50,
  },
})
