import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';


// components
import {
  BaseHeader,
  FaqListItem
} from '../components';


// utils
import { Colors } from '../utils';



const faqs = [
  {
    question: "რა დრო დასჭირდება დატენვას?",
    answer: "„დიდოსტატის კონსტანტინეს მარჯვენა“ 1938–1939 წლებში დაიწერა. რომანის მოქმედება იშლება XI საუკუნის საქართველოში, უპირველესი ქრისტიანული ტაძრის - სვეტიცხოველის - გარშემო.",
  },
  {
    question: "ყველა რომ ერთდროულად ავხტეთ რა მოხდება?",
    answer: "რამოდენიმე წამში ყველანი ისევ დედამიწას დავუბრუნდებით და სამყარო ჩვეულებრივ განაგრძობს მოძრაობას თავისი გზით..",
  },
  {
    question: "ვისი გამოზრდილია იოსებ ბესარიონოვიჩ სტალინი?!",
    answer: "იოსებ ბესარიონოვიჩ ჯუღაშვილი ვლადიმირ ლენინის პირმშოა!",
  },
  {
    question: "გაქვთ თუ არა წაკითხული გრაფი მონტე კრისტო?",
    answer: "აქ ვცხოვრობ რა..",
  }
];



const faq = ({ navigation }: any) => {

  const [activeFaq, setActiveFaq] = useState(1);


  const questions = faqs.map( (el,ind) => {

    return <FaqListItem 
            key={el.question} 
            number={ind+1} 
            question={el.question} 
            answer={el.answer}
            activeFaq={activeFaq}
            setActiveFaq={setActiveFaq} />
  
  });


  return (
    <View style={styles.container}>
      <BaseHeader
        title={'faq.frequentlyAskedQuestions'}
        onPressLeft={() => navigation.navigate('MainDrawer')} />
      <ScrollView style={styles.scrollViewStyle}>
        {questions}
      </ScrollView>
    </View>
  );
}

export default faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  scrollViewStyle:{
    marginTop: 32
  }
});
