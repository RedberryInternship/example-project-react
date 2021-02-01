import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import BaseText from 'components/BaseText'
import colors from 'utils/colors'
import images from 'assets/images'
import { ListItemFC } from './types'

const ListItem: ListItemFC = (
  {
    selected,
    onPress,
    value,
    label,
  },
) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <BaseText style={styles.valueText}>{value}</BaseText>
        <BaseText style={styles.labelText}>{label}</BaseText>
      </View>
      {
        selected
          ? <Image source={images.greenTick} style={styles.selectedTick} />
          : <View style={styles.selectableTick} />
      }
    </View>
  </TouchableOpacity>
)

export default ListItem

const styles = StyleSheet.create(
  {
    container: {
      height: 40,
      borderBottomColor: colors.primaryGray.concat('22'),
      borderBottomWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedTick: {
      width: 20,
      height: 20,
    },
    selectableTick: {
      width: 20,
      height: 20,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: colors.primaryGray,
    },
    textContainer: {
      flexDirection: 'row',
      display: 'flex',
      flex: 1,
    },
    valueText: {
      minWidth: '25%',
    },
    labelText: {
      marginLeft: 10,
    },
  },
)
