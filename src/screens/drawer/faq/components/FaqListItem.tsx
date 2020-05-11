import React, {useState, useEffect, ReactElement} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native'

import {Const, Colors} from 'utils'
import images from 'assets/images'

type FaqListItemProps = {
  number: number
  question: string
  answer: string
  activeFaq: number
  setActiveFaq: (index: number) => void
}

const FaqListItem = ({
  number,
  question,
  answer,
  activeFaq,
  setActiveFaq,
}: FaqListItemProps): ReactElement => {
  const {
    onOrOff,
    opacity,
    paddingMarginValue,
    rotationValue,
    toggleFaq,
    toggleAnswerAnim,
  } = useMyAnim({activeFaq, setActiveFaq, number})

  return (
    <TouchableOpacity onPress={toggleFaq.bind(FaqListItem, 'open')}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.number}>{number}</Text>
          <View style={styles.question}>
            <Text style={styles.questionsText}>{question}</Text>
          </View>
          <View style={styles.arrowBackground}>
            <Animated.Image
              style={[
                styles.arrowImage,
                {transform: [{rotateZ: rotationValue}]},
              ]}
              source={images.arrowUp}
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.answer,
            {
              height: toggleAnswerAnim,
              paddingVertical: paddingMarginValue,
              marginTop: paddingMarginValue,
              borderTopWidth: onOrOff,
            },
          ]}
        >
          <Animated.Text style={[styles.answerText, {opacity}]}>
            {answer}
          </Animated.Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
}

export default FaqListItem

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginLeft: 15,
    marginRight: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryWhite,
  },

  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: Colors.primaryBlue,
    fontSize: 18,
  },
  question: {
    width: Const.Width - 124,
    marginLeft: 8,
  },
  questionsText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: 'bold',
  },
  answer: {
    borderTopColor: 'rgba(22, 27, 28, 0.1)',
  },
  answerText: {
    color: Colors.faqBlue,
  },
  arrowBackground: {
    backgroundColor: 'rgba(0, 138, 238, 0.2)',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowImage: {
    width: 12,
    height: 6,
  },
})

type MyAnimProps = {
  activeFaq: number
  setActiveFaq: (num: number) => void
  number: number
}

const useMyAnim = ({activeFaq, setActiveFaq, number}: MyAnimProps) => {
  const [toggleAnswerAnim] = useState(new Animated.Value(0))

  const toggleFaq = (intend = 'open'): void => {
    let toValue = 0
    const duration = 300

    if (intend === 'open') {
      toValue = 120
      setActiveFaq(number)
    }

    Animated.timing(toggleAnswerAnim, {
      toValue: toValue,
      duration: duration,
    }).start()
  }

  const rotationValue = toggleAnswerAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['180deg', '0deg', '0deg'],
  })

  const paddingMarginValue = toggleAnswerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 16],
  })

  const onOrOff = toggleAnswerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  })

  const opacity = toggleAnswerAnim.interpolate({
    inputRange: [0, 75, 100],
    outputRange: [0, 0, 1],
  })

  useEffect(() => {
    if (activeFaq !== number) {
      toggleFaq('close')
    }
  }, [activeFaq])

  useEffect(() => {
    if (activeFaq === number) {
      toggleFaq('open')
    }
  }, [])

  return {
    rotationValue,
    paddingMarginValue,
    onOrOff,
    opacity,
    toggleFaq,
    toggleAnswerAnim,
  }
}
