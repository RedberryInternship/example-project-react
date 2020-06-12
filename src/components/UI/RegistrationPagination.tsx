import React, {ReactElement} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

import {Colors} from 'utils'
import BaseText from 'components/baseUI/BaseText'

const pagination = [1, 2, 3, 4]
type RegistrationPaginationProps = {
  activePage: number
  paginationClickHandler: (index: number) => void
}
const RegistrationPagination = ({
  activePage,
  paginationClickHandler,
}: RegistrationPaginationProps): ReactElement => {
  return (
    <View style={styles.container}>
      {pagination.map((val, ind) => (
        <TouchableOpacity
          onPress={paginationClickHandler.bind(RegistrationPagination, ind)}
          key={val}
          style={styles.touchable}
          hitSlop={{top: 15, bottom: 15, left: 8, right: 8}}
        >
          <View
            style={[
              styles.paginationContainer,
              {
                borderColor:
                  ind === activePage ? Colors.primaryGreen : '#B8BDC0',
              },
            ]}
          >
            <BaseText
              style={[
                styles.paginationText,
                {color: ind !== activePage ? '#B8BDC0' : Colors.primaryGreen},
              ]}
            >
              {val}
            </BaseText>
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
