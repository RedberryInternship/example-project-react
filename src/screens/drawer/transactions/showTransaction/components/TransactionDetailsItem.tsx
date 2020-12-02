import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BaseText } from 'components'
import colors from 'utils/colors'
import { DetailsItemFC } from 'screens/drawer/transactions/showTransaction/types'

const DetailsItem: DetailsItemFC = ({ name, value }) => (
  <View style={styles.detailsItem}>
    <BaseText style={styles.detailsItemName}>
      {name}
      :
      {' '}
    </BaseText>
    <BaseText style={styles.detailsItemValue}>{value ?? ''}</BaseText>
  </View>
)

export default DetailsItem

const styles = StyleSheet.create(
  {
    detailsItem: {
      flexDirection: 'row',
      marginVertical: 12,
    },
    detailsItemName: {
      fontSize: 13,
      letterSpacing: 0.2,
      color: colors.primaryGray,
    },
    detailsItemValue: {
      fontSize: 13,
      letterSpacing: 0.2,
      color: colors.primaryBackground,
    },
  },
)
