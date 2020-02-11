import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


import { Colors } from '../../utils'; // todo Vobi: use absolute imports  https://medium.com/beqode/absolute-vs-relative-import-paths-nodejs-1e4efa65a7bb


type NotificationItem = {
  title: string,
  description: string,
  date: string
}

const notificationsListItem = ({ title, description, date }: NotificationItem) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default notificationsListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryGray,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding:16
  },
  date: {
    color: Colors.primaryGray,
    fontSize: 13,
    textAlign: "right",
    letterSpacing: .2
  },
  title: {
    color: Colors.primaryBackground,
    fontSize: 15,
    marginVertical: 16,
    letterSpacing: .2
  },
  description: {
    color: Colors.primaryGray,
    fontSize: 13,
    letterSpacing: .2
  }
});