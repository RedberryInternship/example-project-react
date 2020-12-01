import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { BaseHeader, BaseText } from 'components'
import { Colors } from 'utils'
import { ScreenPropsWithNavigation } from 'allTypes'
import { ScrollView } from 'react-native-gesture-handler'
import TariffListItem from './components/TariffListItem'
import TariffDetail from './components/TariffDetail'

const Tarrifs = ({ navigation }: ScreenPropsWithNavigation): ReactElement => (
  <View style={styles.container}>
    <BaseHeader
      title="tariffs.tariffs"
      onPressLeft={navigation.navigate.bind(Tarrifs, 'MainDrawer')}
    />
    <ScrollView>
      <TariffDetail
        title="30 წუთი - 2ლ"
        description="დატენვის დასრულებიდან 20 წუთში ჩაირთვება საჯარიმო ტარიფები"
      />
      <BaseText style={styles.note}>
        ტარიფები მაქსიმალურად მიახლოებულია რეალურთან
      </BaseText>
      {/* TODO: need to connect to backend */}
      {tariffsInfo.map((el) => (
        <TariffListItem key={el.company} {...el} />
      ))}
    </ScrollView>
  </View>
)

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
