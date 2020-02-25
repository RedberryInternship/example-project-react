import React, {ReactElement} from 'react'
import {View, StyleSheet, SafeAreaView, Image} from 'react-native'

// components
import {BaseHeader} from 'components'

// utils
import {Colors} from 'utils'

// images
import {Partners as PartnersImgs} from '../../assets/images'

import {ScreenPropsWithNavigation} from 'allTypes'

const Partners = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  return (
    <View style={styles.container}>
      <BaseHeader
        title={'partners.partnerOrganizations'}
        onPressLeft={navigation.navigate.bind(Partners, 'MainDrawer')}
      />
      <View style={styles.partnersInnerContainer}>
        <View style={styles.partnersRowContainer}>
          <Image source={PartnersImgs.socar} style={{width: 80, height: 19}} />
          <Image source={PartnersImgs.gulf} style={{width: 45, height: 41}} />
          <Image source={PartnersImgs.neogas} style={{width: 82, height: 26}} />
        </View>

        <View style={styles.partnersRowContainer}>
          <Image source={PartnersImgs.bog} style={{width: 87, height: 25}} />
          <Image source={PartnersImgs.wissol} style={{width: 41, height: 37}} />
          <Image source={PartnersImgs.bog} style={{width: 83, height: 14}} />
        </View>

        <View style={styles.partnersRowContainer}>
          <Image source={PartnersImgs.socar} style={{width: 80, height: 19}} />
          <Image source={PartnersImgs.gulf} style={{width: 45, height: 41}} />
          <Image source={PartnersImgs.neogas} style={{width: 82, height: 26}} />
        </View>

        <View style={styles.partnersRowContainer}>
          <Image source={PartnersImgs.m2} style={{width: 87, height: 25}} />
          <Image source={PartnersImgs.wissol} style={{width: 41, height: 37}} />
          <Image source={PartnersImgs.bog} style={{width: 83, height: 14}} />
        </View>
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
  },
  partnersRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
})
