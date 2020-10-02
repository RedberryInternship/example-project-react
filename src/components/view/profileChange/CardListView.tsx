import React, { ReactElement, useContext } from 'react'
import { NavigationScreenProp, NavigationParams, NavigationState, withNavigation } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import CardListItem from 'components/item/CardListItem'
import BaseAddCardButton from 'components/baseUI/BaseAddCardButton'
import { AppContextType } from 'allTypes'
import AppContext from 'hooks/contexts/app'
import { updateUser } from 'hooks/actions/rootActions'
import services from 'services'
import { DisplayDropdownWithError, remoteLogger } from 'helpers/inform'

type CardListViewProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
const CardListView = ({ navigation }: CardListViewProps): ReactElement => {
  const {
    state: { user },
    dispatch,
  }: AppContextType = useContext(AppContext)

  return (
    <View style={styles.container}>
      {user?.user_cards.map((val) => (
        <CardListItem
          key={val.id}
          code={val.masked_pan}
          selected={!!val.default}
          onPress={async () => {
            try {
              val && (await services.setDefaultCard(val.id))
              updateUser(dispatch)
            } catch (error) {
              remoteLogger(error)
              DisplayDropdownWithError()
            }
          }}
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
