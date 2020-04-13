import React, {ReactElement} from 'react'
import {ScrollView, View, StyleSheet, SafeAreaView} from 'react-native'

import {BaseHeader, FetchedDataRenderer} from 'components'
import {Colors, getLocaleText} from 'utils'
import TransactionListItem from './components/TransactionListItem'
import services from 'services'

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
          onItemRender={(val: any): ReactElement => (
            <TransactionListItem
              key={val.id}
              onPress={navigation.navigate.bind(
                TransactionList,
                'ShowTransaction',
                {order: val},
              )}
              title={getLocaleText(val.charger.name)}
              date={val.confirm_date}
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
