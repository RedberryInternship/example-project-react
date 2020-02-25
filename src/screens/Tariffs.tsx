import React, {ReactElement} from 'react'
import {View, StyleSheet, Text} from 'react-native'

// components
import {BaseHeader, TariffDetail, TariffListItem} from 'components'

// utils
import {Colors} from '../utils'

import {ScreenPropsWithNavigation} from 'allTypes'

const Tarrifs = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const tariffList = tariffsInfo.map(el => {
    return (
      <TariffListItem
        key={el.company}
        /* Vobi Todo: Spreading is bad practice in react when you need to modify something in that */
        /* Vobi Todo: And Get Back To Code you have no clue whats going on */

        /* Redberry: What am I modifing? */
        {...el}
      />
    )
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
      {/* Vobi Todo: useTranslations() use translation json everywhere to display static text */}
      {/* Redberry: These are copies we don't yet now what they'll be... */}
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
