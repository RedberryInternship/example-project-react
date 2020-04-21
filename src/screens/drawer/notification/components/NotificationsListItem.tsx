import React, {ReactElement} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {Colors} from 'utils'

type NotificationItemProps = {
  title: string
  description: string
  date: string
}

const NotificationsListItem = ({
  title,
  description,
  date,
}: NotificationItemProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

export default NotificationsListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryGray,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 16,
  },
  date: {
    color: Colors.primaryGray,
    fontSize: 13,
    textAlign: 'right',
    letterSpacing: 0.2,
  },
  title: {
    color: Colors.primaryBackground,
    fontSize: 15,
    marginVertical: 16,
    letterSpacing: 0.2,
  },
  description: {
    color: Colors.primaryGray,
    fontSize: 13,
    letterSpacing: 0.2,
  },
})
