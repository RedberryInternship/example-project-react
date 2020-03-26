import React, {ReactElement, useState, useEffect} from 'react'
import {ScrollView, View, StyleSheet, SafeAreaView, Alert} from 'react-native'

// components
import {
  BaseHeader,
  TransactionListItem,
  BaseText,
  FetchedDataRenderer,
} from 'components'

// utils
import {Colors, Ajax, Defaults, getLocaleText} from 'utils'
import i18next from 'i18next'
import {OrderResponseObject, OrderResponse} from 'allTypes'

const OrderStatic: OrderResponse[] | null = null

const TransactionList = ({navigation}: any): ReactElement => {
  const [orders, setOrders] = useState<OrderResponse[] | null>(OrderStatic)

  const getOrders = async (): Promise<any> => {
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
