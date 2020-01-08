import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';


// utils
import { Const, Colors } from '../../utils';

type FaqItem = {
  number: number,
  question: string,
  answer: string,
  activeFaq: number,
  setActiveFaq: (index: any) => void | undefined
}

const faqListItem = ({ number, question, answer, activeFaq, setActiveFaq }: FaqItem) => {

  const [toggleAnswerAnim] = useState(new Animated.Value(0));
  let toggleAnswer = false;

  const openAnswer = () => {

    Animated.timing(
      toggleAnswerAnim,
      {
        toValue: 120,
        duration: 600
      }
    ).start();

    setActiveFaq(number);
    toggleAnswer = !toggleAnswer;
  }

  const closeAnswer = () => {
    Animated.timing(
      toggleAnswerAnim,
      {
        toValue: 0,
        duration: 500
      }
    ).start();

    toggleAnswer = !toggleAnswer;
    
  }

  const toggleFaqAnswer = () => {
    if (!toggleAnswer) {
      openAnswer();
    } else {
      closeAnswer();
    }
  }


  const rotationValue = toggleAnswerAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['180deg', '0deg', '0deg']
  });

  const paddingMarginValue = toggleAnswerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 16]
  });

  const onOrOff = toggleAnswerAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1]
  });

  const opacity = toggleAnswerAnim.interpolate({
    inputRange: [0, 75, 100],
    outputRange: [0, 0, 1]
  });


  useEffect(()=> {
    if(activeFaq !== number){
      closeAnswer();
      toggleAnswer = !toggleAnswer;
    }
  });

  useEffect(() => {
    if(activeFaq === number){
      openAnswer();
      toggleAnswer = !toggleAnswer;
    }
  }, []);


  return (
    <View style={styles.container}>

      <View style={styles.innerContainer}>

        <Text style={styles.number}>{number}</Text>
        <View style={styles.question}>
          <Text style={styles.questionsText}>{question}</Text>
        </View>

        <TouchableOpacity onPress={() => toggleFaqAnswer()}>
          <View style={styles.arrowBackground}>
            <Animated.Image
              style={[styles.arrowImage, { transform: [{ rotateZ: rotationValue }] }]}
              source={require('../../../assets/images/icons/arrow-up.png')} />
          </View>
        </TouchableOpacity>

      </View>

      <Animated.View style={[styles.answer, {
        height: toggleAnswerAnim,
        paddingVertical: paddingMarginValue,
        marginTop: paddingMarginValue,
        borderTopWidth: onOrOff
      }]}>
        <Animated.Text style={[styles.answerText, { opacity: opacity }]}>{answer}</Animated.Text>
      </Animated.View>

    </View>
  );
}

export default faqListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginLeft: 15,
    marginRight: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryWhite
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",

  },
  number: {
    color: Colors.primaryBlue,
    fontSize: 18
  },
  question: {
    width: Const.Width - 124,
    marginLeft: 8
  },
  questionsText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: "bold"
  },
  answer: {
    borderTopColor: "rgba(22, 27, 28, 0.1)",
  },
  answerText: {
    color: Colors.faqBlue
  },
  arrowBackground: {
    backgroundColor: "rgba(0, 138, 238, 0.2)",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  arrowImage: {
    width: 12,
    height: 6
  }
});