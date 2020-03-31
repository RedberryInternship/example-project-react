import React, {ReactElement} from 'react'
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native'

// components
import {BaseHeader, NotificationListItem} from 'components'

// utils
import {Colors} from 'utils'

import {ScreenPropsWithNavigation} from 'allTypes'

const Notifications = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const notificationItems = notificationsList.map(el => {
    return <NotificationListItem key={el.title} {...el} />
  })

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'notifications.notifications'}
        onPressLeft={navigation.navigate.bind(Notifications, 'MainDrawer')}
      />
      <ScrollView style={styles.scrollViewContainer}>
        {notificationItems}
      </ScrollView>
      <SafeAreaView />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  scrollViewContainer: {
    marginTop: 16,
  },
})

// Vobi Todo: move this as utils
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
