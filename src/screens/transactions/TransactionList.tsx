import React, {ReactElement, useState, useEffect} from 'react'
import {ScrollView, View, StyleSheet, SafeAreaView, Alert} from 'react-native'

// components
import {BaseHeader, TransactionListItem, FetchedDataRenderer} from 'components'

// utils
import {Colors, Ajax, Defaults, getLocaleText} from 'utils'
// Vobi Todo: remove unused imports
// Vobi Todo: remove any
const TransactionList = ({navigation}: any): ReactElement => {
  const getOrders = async (): Promise<any> => {
    // Vobi Todo: move this as service
    // Vobi Todo: no any types
    const res = await Ajax.get('/user-orders')
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
          onItemRender={(val: any, index): ReactElement => (
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
