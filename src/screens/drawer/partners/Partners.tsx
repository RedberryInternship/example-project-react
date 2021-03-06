import React, { ReactElement, useCallback } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import BaseHeader from 'components/BaseHeader'
import FetchedDataRenderer from 'components/FetchedDataRenderer'
import colors from 'utils/colors'
import services from 'services'
import PartnerItem from './components/PartnerItem'
import { PartnersResponseType } from './types'
import { useNavigation } from '@react-navigation/native'

const Partners = () => {
  const navigation = useNavigation();
  const getPartners = useCallback(async () => {
    const { partners } = await services.getPartners()
    return partners
  }, [])

  return (
    <View style={styles.container}>
      <BaseHeader
        title="partners.partnerOrganizations"
        onPressLeft={navigation.navigate.bind(Partners, 'MainDrawer')}
      />
      <ScrollView
        style={styles.partnersInnerContainer}
        contentContainerStyle={styles.contentContainerStyle}
        testID="partners-scrollview"
      >
        <FetchedDataRenderer
          property="Partners"
          onItemRender={(val: PartnersResponseType, index): ReactElement => (
            <PartnerItem key={index} image={val.image} testID={val.image} />
          )}
          fetchData={getPartners}
          updateAlways
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
    backgroundColor: colors.primaryBackground,
  },
  partnersInnerContainer: {
    flex: 1,
    backgroundColor: colors.secondaryGrey,
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
