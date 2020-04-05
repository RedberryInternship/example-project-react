import React, {ReactElement} from 'react'
import {View, StyleSheet, Text} from 'react-native'

// components
import {BaseHeader} from 'components'

// utils
import {Colors} from 'utils'

import {ScreenPropsWithNavigation} from 'allTypes'
import TariffListItem from './components/TariffListItem'
import TariffDetail from './components/TariffDetail'

const Tarrifs = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const tariffList = tariffsInfo.map(el => {
    return <TariffListItem key={el.company} {...el} />
  })

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'tariffs.tariffs'}
        onPressLeft={navigation.navigate.bind(Tarrifs, 'MainDrawer')}
      />
      <TariffDetail
        title="30 წუთი - 2ლ"
        description="დატენვის დასრულებიდან 20 წუთში ჩაირთვება საჯარიმო ტარიფები"
      />
      <Text style={styles.note}>
        ტარიფები მაქსიმალურად მიახლოებულია რეალურთან
      </Text>
      {tariffList}
    </View>
  )
}

export default Tarrifs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  note: {
    color: Colors.primaryLightGrey,
    marginHorizontal: 64,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
})

const tariffsInfo = [
  {
    company: 'მაჭახელა',
    power: '15:30',
    chargerType: 'სწრაფი',
    title: '1 წუთი 1 თეთრი - ტარიფი ზერო',
  },
  {
    company: 'დედას პურები',
    power: '100:100',
    chargerType: 'წავა რა',
    title: '30 წუთი - 2ლ',
  },
]
