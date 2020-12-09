import React from 'react'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import { CardListItem, BaseAddCardButton } from 'components'
import { FCWithNavigation } from 'allTypes'
import useCardListView from './useCardListView'

const CardListView: FCWithNavigation = ({ navigation }) => {
  const {
    updateUserHandler,
    user,
  } = useCardListView()

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
