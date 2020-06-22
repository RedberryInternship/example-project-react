import React, {ReactElement} from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-navigation'

import {BaseHeader, FetchedDataRenderer} from 'components'
import {Colors, getLocaleText} from 'utils'
import TransactionListItem from './components/TransactionListItem'
import services from 'services'
import {UserOrderResponseItem} from 'allTypes'

const TransactionList = ({navigation}: any): ReactElement => {
  const getOrders = async (): Promise<any> => {
    const res = await services.getUserOrders()
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
          onItemRender={(val: UserOrderResponseItem): ReactElement => (
            <TransactionListItem
              key={val.id}
              onPress={navigation.navigate.bind(
                TransactionList,
                'ShowTransaction',
                {order: val},
              )}
              title={getLocaleText(val.charger_connector_type?.charger.name)}
              date={val.created_at}
              price={val.price}
            />
          )}
          updateAlways={true}
          fetchData={getOrders}
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
