import React, { useState, ReactElement } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { BaseHeader, FetchedDataRenderer } from 'components'
import { Colors, getLocaleText } from 'utils'
import services from 'services'
import { FCWithNavigation } from 'allTypes'
import FaqListItem from './components/FaqListItem'
import { FAQResponseType } from './types'

const Faq: FCWithNavigation = ({ navigation }) => {
  const [activeFaq, setActiveFaq] = useState<number>(1)

  const getFAQ = async (): Promise<any> => {
    const res = await services.getFAQ()
    return res.faq
  }

  return (
    <View style={styles.container}>
      <BaseHeader
        title="faq.frequentlyAskedQuestions"
        onPressLeft={navigation.navigate.bind(Faq, 'MainDrawer')}
      />
      <ScrollView style={styles.scrollViewStyle}>
        <FetchedDataRenderer
          property="Faq"
          onItemRender={(
            val: FAQResponseType,
            index: number,
          ): ReactElement => (
              <FaqListItem
                key={index}
                number={index + 1}
                question={getLocaleText(val.question)}
                answer={getLocaleText(val.answer)}
                active={activeFaq === index}
                toggle={(open = true) => setActiveFaq(open ? index : -1)}
              />
            )}
          fetchData={getFAQ}
          updateAlways
        />
      </ScrollView>
    </View>
  )
}

export default Faq

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  scrollViewStyle: {
    marginTop: 32,
  },
})
