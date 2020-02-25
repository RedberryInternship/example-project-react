import React, {ReactElement, useEffect, useState} from 'react'
import {View, StyleSheet, SafeAreaView, Image} from 'react-native'

// components
import {BaseHeader} from 'components'

// utils
import {Colors, Ajax, Defaults, Const} from 'utils'
import i18next from 'i18next'

type PartnersResponseType = {
  name: string
  image: string
}

let PartnersArray: PartnersResponseType[] = []

const Partners = ({navigation}: any): ReactElement => {
  const [partners, setPartners] = useState(PartnersArray)
  useEffect(() => {
    getPartners()
  }, [])

  const getPartners = async (): Promise<void> => {
    if (PartnersArray.length === 0) {
      try {
        const res = await Ajax.get('/partners')
        setPartners(res.partners)
        PartnersArray = res.partners
      } catch (error) {
        Defaults.dropdown?.alertWithType(
          'error',
          i18next.t('dropDownAlert.generalError'),
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'partners.partnerOrganizations'}
        onPressLeft={navigation.navigate.bind(Partners, 'MainDrawer')}
      />
      <View style={styles.partnersInnerContainer}>
        {partners.map(
          (val: PartnersResponseType, index: number): ReactElement => (
            <View key={index} style={styles.partnerImageContainer}>
              <Image
                source={{uri: val.image}}
                style={{width: 80, height: 40}}
                resizeMode={'contain'}
              />
            </View>
          ),
        )}
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
