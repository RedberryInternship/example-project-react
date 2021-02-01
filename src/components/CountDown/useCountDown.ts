import {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'
import moment from 'moment'
import { ChargingStatus } from 'types'
import { UseCountDown } from './types'

const INTERVAL = 1000

const useCountDown = ({
  penaltyEnabled,
  chargingStatus,
  startTime,
  onFinish,
  alarm,
}: UseCountDown) => {
  const [time, setTime] = useState('.')
  const ref: any = useRef(null)

  const onFreePenalty = useCallback(() => !penaltyEnabled && (
    chargingStatus === ChargingStatus.CHARGED
    || chargingStatus === ChargingStatus.USED_UP
  ), [chargingStatus, penaltyEnabled])

  const countUp = useCallback(() => {
    if (!startTime || onFreePenalty()) {
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
  }, [time, startTime, alarm, onFinish, onFreePenalty])

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
