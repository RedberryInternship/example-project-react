import React, {ReactElement, useEffect, useState} from 'react'
import {View, StyleSheet, SafeAreaView, Image} from 'react-native'

// components
import {BaseHeader, FetchedDataRenderer} from 'components'

// utils
import {Colors, Ajax, Const} from 'utils'

type PartnersResponseType = {
  name: string
  image: string
}

const Partners = ({navigation}: any): ReactElement => {
  const getPartners = async (): Promise<void> => {
    const res = await Ajax.get('/partners')
    return res.partners
  }

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'partners.partnerOrganizations'}
        onPressLeft={navigation.navigate.bind(Partners, 'MainDrawer')}
      />
      <View style={styles.partnersInnerContainer}>
        {
          <FetchedDataRenderer
            property={'Partners'}
            onItemRender={(val: PartnersResponseType, index): ReactElement => (
              <View key={index} style={styles.partnerImageContainer}>
                <Image
                  source={{uri: val.image}}
                  style={{width: 80, height: 40}}
                  resizeMode={'contain'}
                />
              </View>
            )}
            fetchData={getPartners}
          />
        }
      </View>
      <SafeAreaView />
    </View>
  )
}

export default Partners

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  partnersInnerContainer: {
    flex: 1,
    backgroundColor: Colors.secondaryGrey,
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    padding: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  partnerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: (Const.Width - 32) / 3,
    height: 80,
  },
})
