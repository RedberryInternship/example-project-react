import React, {ReactElement} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {Colors} from 'utils'
import {BaseText} from 'components'

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
      <BaseText style={styles.date}>{date}</BaseText>
      <BaseText style={styles.title}>{title}</BaseText>
      <BaseText style={styles.description}>{description}</BaseText>
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
