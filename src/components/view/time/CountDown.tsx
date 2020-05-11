import React, {
  useState,
  useEffect,
  ReactElement,
  useCallback,
  useRef,
} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import moment from 'moment'

import {Colors} from 'utils'

enum Status {
  'finished',
  'started',
  'threeMinuteLefted', // Vobi Todo: use spell checker
}
type CountDownProps = {
  startTime?: string
  alarm: boolean
  popup?: boolean
  onChange?: (status: Status) => void
  up?: boolean
  duration?: number
}
const Interval = 1000

const CountDown = ({
  startTime,
  alarm,
  onChange,
  popup,
  up,
  duration,
}: CountDownProps): ReactElement => {
  const [time, setTime] = useState('')
  const ref: any = useRef(null)

  useEffect(() => {
    ref.current = setTimeout(up ? countUp.bind(CountDown) : countDown, 1000)

    return (): void => {
      clearTimeout(ref.current)
    }
  }, [startTime, time])

  const countUp = () => {
    if (!startTime)
      return setTime((prevState) =>
        prevState.length !== 3 ? prevState + '.' : '.',
      )
    const diff = moment.duration(moment().valueOf() - parseInt(startTime))

    console.log(moment().valueOf(), diff, startTime, 'diff.seconds')

    const hour = diff.hours() ? pad(diff.hours()) + ':' : ''
    const countdownString = `${hour}${pad(diff.minutes())}:${pad(
      diff.seconds(),
    )}`
    // console.log(startTime, countdownString, diff, time, 'fstartTime')

    setTime(countdownString)
  }

  const countDown = () => {
    duration && setTime(`${pad(parseInt(duration / 60))}:${pad(duration % 60)}`)
  }

  const pad = (val: number) => {
    const valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }

  const textStyle = {
    fontSize: popup ? 17 : 22,
    color: popup ? Colors.primaryBackground : Colors.primaryWhite,
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textStyle]}>{time}</Text>
    </View>
  )
}

export default CountDown

const styles = StyleSheet.create({
  container: {},
  text: {
    lineHeight: 36,
    letterSpacing: 0.41,
  },
})
