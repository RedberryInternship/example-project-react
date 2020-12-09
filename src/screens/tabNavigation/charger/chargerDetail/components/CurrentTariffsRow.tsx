import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BaseText } from 'components'
import colors from 'utils/colors'
import { CurrentTariffsRowFC } from 'screens/tabNavigation/charger/chargerDetail/types'

const Row: CurrentTariffsRowFC = (
  {
    col1,
    col2,
    col3,
    col4,
  },
) => (
    <View style={styles.rowContainer}>
      <BaseText style={styles.rowCol1}>{col1}</BaseText>
      <BaseText style={styles.rowCol2}>{col2}</BaseText>
      <BaseText style={styles.rowCol3}>{col3}</BaseText>
      <BaseText style={styles.rowCol4}>{col4}</BaseText>
    </View>
  )

export default Row

const styles = StyleSheet.create(
  {
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 44,
      borderTopColor: '#11222D',
      borderTopWidth: 1,
    },
    rowCol1: {
      flex: 0.7,
      alignSelf: 'center',
      color: colors.primaryWhite,
      fontSize: 11,
    },
    rowCol2: {
      flex: 0.3,
      alignSelf: 'center',
      color: colors.primaryWhite,
      fontSize: 11,
    },
    rowCol3: {
      flex: 1.2,
      alignSelf: 'center',
      color: colors.primaryWhite,
      fontSize: 11,
      flexWrap: 'nowrap',
    },
    rowCol4: {
      flex: 0.8,
      alignSelf: 'center',
      color: colors.primaryWhite,
      fontSize: 11,
      textAlign: 'center',
    },
  },
)
