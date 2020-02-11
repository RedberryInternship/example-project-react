import React from 'react'
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native'

// components
import {BaseHeader, NotificationListItem} from 'components'

// utils
import {Colors} from 'utils'

const notifications = ({navigation}: any) => {
  const notificationItems = notificationsList.map(el => {
    return <NotificationListItem key={el.title} {...el} />
  })

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'notifications.notifications'}
        onPressLeft={() => navigation.navigate('MainDrawer')}
      />
      <ScrollView style={styles.scrollViewContainer}>
        {notificationItems}
      </ScrollView>
      <SafeAreaView />
    </View>
  )
}

export default notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  scrollViewContainer: {
    marginTop: 16,
  },
})

const notificationsList = [
  {
    title: 'სისტემური განახლება',
    description:
      'გაცნობებთ, რომ მიმდინარეობს სისტემური განახლება! პანიკის გარეშე...',
    date: '12/11/2020',
  },
  {
    title: 'რელევანტური ინფორმაცია',
    description:
      'გაცნობებთ, რომ მიმდინარეობს სისტემური განახლება! პანიკის გარეშე...',
    date: '12/11/2020',
  },
  {
    title: 'არარელევანტური ინფორმაცია',
    description:
      'გაცნობებთ, რომ მიმდინარეობს სისტემური განახლება! პანიკის გარეშე...',
    date: '12/11/2020',
  },
  {
    title: 'კოჰაბიტაცია',
    description:
      'გაცნობებთ, რომ მიმდინარეობს სისტემური განახლება! პანიკის გარეშე...',
    date: '12/11/2020',
  },
  {
    title: 'მამათმავლობა',
    description:
      'გაცნობებთ, რომ მიმდინარეობს სისტემური განახლება! პანიკის გარეშე...',
    date: '12/11/2020',
  },
  {
    title: 'ველისციხე',
    description:
      'გაცნობებთ, რომ მიმდინარეობს სისტემური განახლება! პანიკის გარეშე...',
    date: '12/11/2020',
  },
]
