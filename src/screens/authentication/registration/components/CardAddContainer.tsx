import React, {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'

import {Const} from 'utils'
import {CardAddView} from 'components'

type CardAddContainerProps = {
  activePage: number
  onSuccess: () => void
}
const CardAddContainer = ({
  activePage,
  onSuccess,
}: CardAddContainerProps): ReactElement => {
  return (
    <View style={styles.container}>
      {activePage === 3 && <CardAddView onSuccess={onSuccess} />}
    </View>
  )
}

export default React.memo(
  CardAddContainer,
  ({activePage}, {activePage: nextActivePage}) =>
    nextActivePage != 3 && activePage != 3,
)

const styles = StyleSheet.create({
  container: {
    width: Const.Width,
    flex: 1,
    backgroundColor: 'red',
    minHeight: Const.Height * 0.7,
  },
})
