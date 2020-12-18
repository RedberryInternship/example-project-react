import React from 'react'
import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import { selectUser } from 'state/selectors'
import { CardListItem, BaseAddCardButton } from 'components'
import { FCWithNavigation } from 'types'
import useCardListView from './useCardListView'

const CardListView: FCWithNavigation = ({ navigation }) => {
  const { updateUserHandler } = useCardListView()
  const { user } = useSelector(selectUser)

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
