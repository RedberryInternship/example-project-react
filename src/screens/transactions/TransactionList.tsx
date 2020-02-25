import React, {ReactElement, useState, useEffect} from 'react'
import {ScrollView, View, StyleSheet, SafeAreaView, Alert} from 'react-native'

// components
import {BaseHeader, TransactionListItem} from 'components'

// utils
import {Colors, Ajax, Defaults, getLocaleText} from 'utils'
import i18next from 'i18next'
import {OrderResponseObject, OrderResponse} from 'allTypes'

let OrderStatic: OrderResponse[] = []

const TransactionList = ({navigation}: any): ReactElement => {
  const [orders, setOrders] = useState<OrderResponse[]>(OrderStatic)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async (): Promise<void> => {
    try {
      const res: OrderResponseObject = await Ajax.get('/user-orders')
      Alert.alert('sdf')
      setOrders(res.orders)
      OrderStatic = res.orders
    } catch (error) {
      Defaults.dropdown?.alertWithType(
        'error',
        i18next.t('dropDownAlert.generalError'),
      )
    }
  }
  return (
    <View style={styles.container}>
      <BaseHeader
        title={'transactions.transactions'}
        onPressLeft={navigation.navigate.bind(TransactionList, 'MainDrawer')}
      />
      <ScrollView style={styles.transactionsContainer}>
        {orders.map(
          (val: OrderResponse): ReactElement => {
            return (
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
            )
          },
        )}
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
