import React from 'react'

import {View, StyleSheet} from 'react-native'

// components
import {CardListItem, BaseAddCardButton} from 'components'

const cardListView = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <CardListItem
        code={'1111222233334444'}
        selected={true}
        onPress={() => null}
      />
      <CardListItem
        code={'2222333344441111'}
        selected={false}
        onPress={() => null}
      />
      <CardListItem
        code={'1111222244443333'}
        selected={false}
        onPress={() => null}
      />
      <BaseAddCardButton onPress={() => navigation.navigate('')} />
    </View>
  )
}

export default cardListView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 50,
  },
})
