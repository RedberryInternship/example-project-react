import React, {useState, useEffect} from 'react';
import { StyleSheet,Text,  View, Alert} from 'react-native';
import moment, {Moment, DurationInputObject} from "moment"
import { Colors } from '../../../../src/utils';

const styles = StyleSheet.create({
  container : {
  },
});

enum Status {"finished" ,"started" ,"threeMinuteLefted"}
type CountDown = {
  duration : number ,
  up : Boolean,
  alarm : Boolean,
  popup ?: Boolean,
  onChange? : (status : Status) => void
}
const Interval = 1000;

const countDown = ({ duration, up, alarm , onChange, popup} : CountDown) => {
  let [time, setTime] = useState(``)
  

  const showDate =() =>{
    return moment(duration).utcOffset(0).format(`${alarm ? '' : 'HH : ' }mm : ss`).toString()
  }
  useEffect(()=>{
    setTime( showDate() )

    const timeInterval = setInterval(() =>{

      duration = moment.duration((duration + (up ? Interval :  -Interval ) )  , 'milliseconds').asMilliseconds();

      if(duration <= 0) {
        setTime( showDate() )
        onChange && onChange(Status.finished)
        clearInterval(timeInterval)
        return
      }
      setTime( showDate() )

    }, 1000)

    return ()=>{
      clearInterval(timeInterval)
    }
  }, [])



  return (
      <View style={styles.container}>
        <Text style={{fontSize: popup ? 17 : 22, lineHeight:36,letterSpacing:-0.41,color:popup ? Colors.primaryBackground :  Colors.primaryWhite}}>{time}</Text>
      </View>
  );
};


export default countDown;
