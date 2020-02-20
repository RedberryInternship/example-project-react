import React from 'react'
import {ScrollView, View, StyleSheet, SafeAreaView} from 'react-native'

// components
import {BaseHeader, TransactionListItem} from 'components'

// utils
import {Colors} from 'utils'

const transactionList = ({navigation}: any) => {
  // Vobi Todo: No any types

  const transactions = transactionListContent.map(el => {
    return (
      <TransactionListItem
        key={el.title}
        // Vobi Todo: I can not see reason to use binding instead of arrow function
        onPress={navigation.navigate.bind(
          transactionList,
          'ShowTransaction',
          el,
        )}
        {...el}
      />
    )
  })

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'transactions.transactions'}
        onPressLeft={navigation.navigate.bind(transactionList, 'MainDrawer')}
      />
      <ScrollView style={styles.transactionsContainer}>
        {transactions}
      </ScrollView>
      <SafeAreaView />
    </View>
  )
}

export default transactionList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  transactionsContainer: {
    marginTop: 16,
  },
})

// Vobi Todo: move this in constants
const transactionListContent = [
  {
    title: 'მაჭახელა',
    date: '12/11/2020',
    time: '13:42',
    price: '-15 ლარი',

    duration: '40 წუთი',
    power: '5.60',
    energy: '2.24',
    address: 'საირმის ქუჩა 110',
    cardNumber: 'XXXX 2222',
  },
  {
    title: 'ჩემთან სახლში',
    date: '07/11/2020',
    time: '12:42',
    price: '-7 ლარი',

    duration: '27 წუთი',
    power: '3',
    energy: '2.24',
    address: 'სადმე 127',
    cardNumber: 'XXXX 8725',
  },
  {
    title: 'ვისკი ჰაუსი',
    date: '12/11/2019',
    time: '13:00',
    price: '-18 ლარი',

    duration: '23 საათი',
    power: '127',
    energy: '9',
    address: 'მოსკოვის გამზირი',
    cardNumber: 'XXXX 9988',
  },
  {
    title: 'კაფე ფლაუერსი',
    date: '12/01/2019',
    time: '19:42',
    price: '-25 ლარი',

    duration: '8 წუთი',
    power: '8.9',
    energy: '22',
    address: 'სუხიშვილის 46',
    cardNumber: 'XXXX 0987',
  },
  {
    title: 'ლაქი შაურმა',
    date: '12/11/2019',
    time: '19:59',
    price: '-10 ლარი',

    duration: '98 წუთი',
    power: '8.26',
    energy: '9',
    address: 'მარჯანიშვილის ქუჩა',
    cardNumber: 'XXXX 9275',
  },
  {
    title: 'ლილო მოლი',
    date: '02/07/2018',
    time: '09:10',
    price: '-15 ლარი',

    duration: '59 წუთი',
    power: '99',
    energy: '66',
    address: 'ჯორჯ ბუშის ქუჩა',
    cardNumber: 'XXXX 8651',
  },
  {
    title: 'ნიკორა',
    date: '06/07/2017',
    time: '14:00',
    price: '-1 ლარი',

    duration: '6 წუთი',
    power: '54 წუთი',
    energy: '7',
    address: 'სვანების უბანი',
    cardNumber: 'XXXX 7755',
  },
  {
    title: '2 ნაბიჯი',
    date: '12/12/2016',
    time: '13:13',
    price: '-27 ლარი',

    duration: '49 წუთი',
    power: '65',
    energy: '26',
    address: 'ბარათაშვილის ქუჩა',
    cardNumber: 'XXXX 8275',
  },
  {
    title: 'სპარი',
    date: '12/12/2015',
    time: '18:22',
    price: '-9 ლარი',

    duration: '7 წუთი',
    power: '34.2',
    energy: '6.5',
    address: 'ორბელიანის ქუჩა',
    cardNumber: 'XXXX 6742',
  },
  {
    title: 'ცეზარ პალასი',
    date: '02/01/2014',
    time: '12:21',
    price: '-3 ლარი',

    duration: '60 წუთი ანუ 1 საათი',
    power: '8.8',
    energy: '7.7',
    address: 'ლას ვეგასი',
    cardNumber: 'XXXX YYYY',
  },
]
