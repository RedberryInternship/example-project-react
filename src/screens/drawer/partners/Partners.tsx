import React, {ReactElement, useCallback} from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
} from 'react-native'

import {Partner, Navigation} from 'allTypes'

import {BaseHeader, FetchedDataRenderer} from 'components'
import {Colors, Const} from 'utils'
import PartnerItem from './components/PartnerItem'
import services from 'services'

type PartnersResponseType = {
  name: string
  image: string
}
const Partners = ({navigation}: {navigation: Navigation}): ReactElement => {
  const getPartners = useCallback(async (): Promise<Partner[]> => {
    const {partners} = await services.getPartners()
    return partners
  }, [])

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'partners.partnerOrganizations'}
        onPressLeft={navigation.navigate.bind(Partners, 'MainDrawer')}
      />
      <ScrollView
        style={styles.partnersInnerContainer}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <FetchedDataRenderer
          property={'Partners'}
          onItemRender={(val: PartnersResponseType, index): ReactElement => (
            <PartnerItem key={index} image={val.image} />
          )}
          fetchData={getPartners}
          updateAlways={true}
        />
      </ScrollView>
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
    padding: 16,
  },
  contentContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
})
