import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Const from 'utils/const'
import { CardAddView } from 'components'
import { CardAddContainerFC } from 'screens/authentication/registration/types'

const CardAddContainer: CardAddContainerFC = (
  {
    activePage,
    onSuccess,
  }
) => (
    <View style={styles.container}>
      {activePage === 3 && <CardAddView onSuccess={onSuccess} />}
    </View>
  )

export default React.memo(
  CardAddContainer,
  (
    {
      activePage
    },
    {
      activePage: nextActivePage
    }
  ) => nextActivePage !== 3 && activePage !== 3,
)

const styles = StyleSheet.create({
  container: {
    width: Const.Width,
    flex: 1,
    backgroundColor: 'red',
    minHeight: Const.Height * 0.7,
  },
})
