import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BaseHeader from 'components/BaseHeader'
import FetchedDataRenderer from 'components/FetchedDataRenderer'
import { Colors } from 'utils'
import { TransactionsHistoryResponseItem } from 'types'
import TransactionListItem from './components/TransactionListItem'
import { getTransactionsHistory } from './helpers'

const TransactionList = ({ navigation }: any) => (
  <View style={styles.container}>
    <BaseHeader
      title="transactions.transactions"
      onPressLeft={navigation.navigate.bind(TransactionList, 'MainDrawer')}
    />
    <ScrollView style={styles.transactionsContainer}>
      <FetchedDataRenderer
        property="Partners"
        onItemRender={(val: TransactionsHistoryResponseItem) => (
          <TransactionListItem
            key={val.id}
            onPress={() => navigation.navigate(
              'ShowTransaction',
              { order: val },
            )}
            charger_name={val.charger_name}
            start_date={val.start_date}
            charge_price={val.charge_price}
          />
        )}
        updateAlways
        fetchData={getTransactionsHistory}
      />
    </ScrollView>
    <SafeAreaView />
  </View>
)

export default TransactionList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  transactionsContainer: {
    marginTop: 16,
  },
})
