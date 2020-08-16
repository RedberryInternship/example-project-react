import React, {ReactElement} from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-navigation'

import {BaseHeader, FetchedDataRenderer} from 'components'
import {Colors, getLocaleText} from 'utils'
import TransactionListItem from './components/TransactionListItem'
import services from 'services'
import {TransactionsHistoryResponseItem} from 'allTypes'

const TransactionList = ({navigation}: any): ReactElement => {
  const getTransactionsHistory = async (): Promise<any> => {
    const res = await services.getTransactionsHistory()
    return res.data
  }

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'transactions.transactions'}
        onPressLeft={navigation.navigate.bind(TransactionList, 'MainDrawer')}
      />
      <ScrollView style={styles.transactionsContainer}>
        <FetchedDataRenderer
          property={'Partners'}
          onItemRender={(val: TransactionsHistoryResponseItem ): ReactElement => (
            <TransactionListItem
              key={val.id}
              onPress={navigation.navigate.bind(
                TransactionList,
                'ShowTransaction',
                {order: val},
              )}
              charger_name={val.charger_name}
              start_date={val.start_date}
              charge_price={val.charge_price}
            />
          )}
          updateAlways={true}
          fetchData={getTransactionsHistory}
        />
      </ScrollView>
      <SafeAreaView />
    </View>
  )
}

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
