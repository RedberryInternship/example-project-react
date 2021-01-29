import {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'
import moment from 'moment'
import { UseCountDown } from './types'

const INTERVAL = 1000

const useCountDown = ({
  alarm, onFinish, startTime, penaltyEnabled,
}: UseCountDown) => {
  const [time, setTime] = useState('.')
  const ref: any = useRef(null)

  const countUp = useCallback(() => {
    if (!startTime || !penaltyEnabled) {
      return setTime((prevState) => (prevState.length !== 3 ? `${prevState}.` : '.'))
    }
    const diff = moment().valueOf() - parseInt(startTime)
    const momentDiff = moment.duration(Math.abs(diff))

    if (alarm && diff > 0) {
      onFinish && onFinish()
      // return
    }

    const hour = momentDiff.hours() ? `${pad(momentDiff.hours())}:` : ''
    const countdownString = `${hour}${pad(momentDiff.minutes())}:${pad(
      momentDiff.seconds(),
    )}`

    setTime(countdownString)
  }, [time, startTime, alarm, onFinish, penaltyEnabled])

  useEffect(() => {
    ref.current = setTimeout(countUp, INTERVAL)

    return (): void => {
      clearTimeout(ref.current)
    }
  }, [countUp])

  const pad = (val: number) => {
    const valString = `${val}`
    if (valString.length < 2) {
      return `0${valString}`
    }
    return valString
  }

  return {
    time,
  }
}

export default useCountDown
