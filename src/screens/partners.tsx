import React from 'react'
import {View, StyleSheet, SafeAreaView, Image} from 'react-native'

// components
import {BaseHeader} from 'components'

// utils
import {Colors} from 'utils'

const partners = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <BaseHeader
        title={'partners.partnerOrganizations'}
        onPressLeft={navigation.navigate.bind(partners, 'MainDrawer')}
      />
      <View style={styles.partnersInnerContainer}>
        <View style={styles.partnersRowContainer}>
          <Image
            source={require('../../assets/images/icons/partners/socar.png')}
            style={{width: 80, height: 19}}
          />
          <Image
            source={require('../../assets/images/icons/partners/gulf.png')}
            style={{width: 45, height: 41}}
          />
          <Image
            source={require('../../assets/images/icons/partners/neogas.png')}
            style={{width: 82, height: 26}}
          />
        </View>

        <View style={styles.partnersRowContainer}>
          <Image
            source={require('../../assets/images/icons/partners/m2.png')}
            style={{width: 87, height: 25}}
          />
          <Image
            source={require('../../assets/images/icons/partners/wissol.png')}
            style={{width: 41, height: 37}}
          />
          <Image
            source={require('../../assets/images/icons/partners/bog.png')}
            style={{width: 83, height: 14}}
          />
        </View>

        <View style={styles.partnersRowContainer}>
          <Image
            source={require('../../assets/images/icons/partners/socar.png')}
            style={{width: 80, height: 19}}
          />
          <Image
            source={require('../../assets/images/icons/partners/gulf.png')}
            style={{width: 45, height: 41}}
          />
          <Image
            source={require('../../assets/images/icons/partners/neogas.png')}
            style={{width: 82, height: 26}}
          />
        </View>

        <View style={styles.partnersRowContainer}>
          <Image
            source={require('../../assets/images/icons/partners/m2.png')}
            style={{width: 87, height: 25}}
          />
          <Image
            source={require('../../assets/images/icons/partners/wissol.png')}
            style={{width: 41, height: 37}}
          />
          <Image
            source={require('../../assets/images/icons/partners/bog.png')}
            style={{width: 83, height: 14}}
          />
        </View>
      </View>
      <SafeAreaView />
    </View>
  )
}

export default partners

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
