import React, {useState, ReactElement, useEffect} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import i18next from 'i18next'

// components
import {BaseHeader, FaqListItem} from 'components'

// utils
import {Colors, Ajax, Defaults, getLocaleText} from 'utils'
import {LocaleStringObject, ScreenPropsWithNavigation} from 'allTypes'

type FAQResponseType = {
  question: LocaleStringObject
  answer: LocaleStringObject
}

let FAQStatic: FAQResponseType[] = []

const Faq = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const [activeFaq, setActiveFaq] = useState<number>(1)
  const [faqs, setFaqs] = useState(FAQStatic)

  useEffect(() => {
    getFAQ()
  }, [])

  const getFAQ = async (): Promise<void> => {
    if (FAQStatic.length === 0) {
      try {
        const res = await Ajax.get('/faq')
        setFaqs(res.faq)
        FAQStatic = res.faq
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
        title={'faq.frequentlyAskedQuestions'}
        onPressLeft={navigation.navigate.bind(Faq, 'MainDrawer')}
      />
      <ScrollView style={styles.scrollViewStyle}>
        {faqs.map((el, ind) => (
          <FaqListItem
            key={ind}
            number={ind + 1}
            question={getLocaleText(el.question)}
            answer={getLocaleText(el.answer)}
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq}
          />
        ))}
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
