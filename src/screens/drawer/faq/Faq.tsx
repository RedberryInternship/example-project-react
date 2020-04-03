import React, {useState, ReactElement} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'

import {LocaleStringObject, ScreenPropsWithNavigation} from 'allTypes'

import {BaseHeader, FetchedDataRenderer} from 'components'
import {Colors, Ajax, getLocaleText} from 'utils'
import FaqListItem from './components/FaqListItem'

type FAQResponseType = {
  question: LocaleStringObject
  answer: LocaleStringObject
}

const Faq = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const [activeFaq, setActiveFaq] = useState<number>(1)

  const getFAQ = async (): Promise<any> => {
    const res = await Ajax.get('/faq')
    return res.faq
  }

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'faq.frequentlyAskedQuestions'}
        onPressLeft={navigation.navigate.bind(Faq, 'MainDrawer')}
      />
      <ScrollView style={styles.scrollViewStyle}>
        {
          <FetchedDataRenderer
            property={'Faq'}
            onItemRender={(
              val: FAQResponseType,
              index: number,
            ): ReactElement => (
              <FaqListItem
                key={index}
                number={index + 1}
                question={getLocaleText(val.question)}
                answer={getLocaleText(val.answer)}
                activeFaq={activeFaq}
                setActiveFaq={setActiveFaq}
              />
            )}
            fetchData={getFAQ}
          />
        }
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
