import React, {useState, useEffect, ReactElement} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native'

import {Const, Colors} from 'utils'
import images from 'assets/images'
import {BaseText} from 'components'
import useFaqListItem from './useFaqListItem'

type FaqListItemProps = {
  number: number
  question: string
  answer: string
  active: boolean
  toggle: (index: boolean) => void
}

const FaqListItem = ({
  number,
  question,
  answer,
  active,
  toggle,
}: FaqListItemProps): ReactElement => {
  const {onOrOff, opacity, paddingMarginValue, rotationValue} = useFaqListItem({
    active,
  })

  return (
    <TouchableOpacity onPress={() => toggle(true)} activeOpacity={0.9}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <BaseText style={styles.number}>{number}</BaseText>
          <View style={styles.question}>
            <BaseText style={styles.questionsText}>{question}</BaseText>
          </View>
          <TouchableOpacity
            onPress={() => toggle(!active)}
            style={styles.arrowBackground}
          >
            <Animated.Image
              style={[
                styles.arrowImage,
                {transform: [{rotateZ: rotationValue}]},
              ]}
              source={images.arrowUp}
            />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.answer,
            {
              // height: activeFaq ? 'auto' : 0,
              display: active ? 'flex' : 'none',
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