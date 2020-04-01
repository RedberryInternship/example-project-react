import React, {ReactElement} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Colors} from 'utils'

const pagination = [1, 2, 3, 4]

const RegistrationPagination = ({
  activePage,
  paginationClickHandler,
}: any): ReactElement => {
  // Vobi todo: no any types
  return (
    <View style={styles.container}>
      {pagination.map((val, ind) => (
        <TouchableOpacity
          onPress={paginationClickHandler.bind(RegistrationPagination, ind)}
          key={val}
          style={styles.touchable}>
          <View
            style={[
              styles.paginationContainer,
              {
                borderColor:
                  ind === activePage ? Colors.primaryGreen : '#B8BDC0',
              },
            ]}>
            <Text
              style={[
                styles.paginationText,
                {color: ind !== activePage ? '#B8BDC0' : Colors.primaryGreen},
              ]}>
              {val}
            </Text>
          </View>
          {ind !== pagination.length - 1 && <View style={styles.gap}></View>}
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default RegistrationPagination

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flex: 0,
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#B8BDC0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  gap: {
    width: 6,
    height: 1,
    backgroundColor: '#879299',
    marginHorizontal: 2,
  },
})
