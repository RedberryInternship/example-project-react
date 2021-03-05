/* eslint-disable max-len */
import React from 'react'
import Svg, {
  LinearGradient,
  ClipPath,
  Ellipse,
  Path,
  Defs,
  Stop,
  G,
} from 'react-native-svg'
import { determineTimePeriod } from 'utils/map'
import { ChargerMarkerIcon } from 'types'
import { pinColorTypes } from './config'

const RootPin = (
  {
    width = 40,
    height = 56,
    privateCharger,
    fastCharger,
    pinColorType,
  }: ChargerMarkerIcon,
) => (
  <Svg width={width ?? 40} height={height ?? 55} viewBox="0 0 58 68" fill="none">
    <G opacity={0.64}>
      <Ellipse
        cx={28.5}
        cy={56.5}
        rx={17.5}
        ry={7.5}
        fill={determineTimePeriod() ? '#00000033' : '#000'}
      />
    </G>
    <G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M28.661 55.932S49.323 41.77 49.323 25.245c0-5.635-2.177-11.038-6.052-15.023C39.396 6.239 34.141 4 28.661 4c-5.48 0-10.735 2.238-14.61 6.223C10.178 14.207 8 19.61 8 25.245 8 41.77 28.661 55.932 28.661 55.932zm0-17.31c7.094 0 12.844-5.876 12.844-13.123 0-7.248-5.75-13.123-12.844-13.123-7.093 0-12.843 5.875-12.843 13.123 0 7.247 5.75 13.122 12.843 13.122z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        // eslint-disable-next-line max-len
        translateX={-1}
        d="M29.661 56.932l-.141.207a.25.25 0 00.283 0l-.142-.207zm14.61-45.71l-.18.175.18-.175zm-29.22 0l.18.175-.18-.175zm35.022 15.023c0 8.164-5.11 15.776-10.265 21.37a70.354 70.354 0 01-9.408 8.476 40.697 40.697 0 01-.88.635l.141.206a13.736 13.736 0 00.143.206l.003-.002.012-.008.045-.032c.04-.027.098-.069.174-.123.153-.109.376-.27.66-.48a70.846 70.846 0 009.478-8.538c5.176-5.618 10.397-13.35 10.397-21.71h-.5zm-5.981-14.848c3.828 3.937 5.98 9.278 5.98 14.848h.5c0-5.699-2.2-11.165-6.122-15.197l-.358.349zM29.662 5.25c5.41 0 10.601 2.21 14.43 6.147l.358-.349C40.53 7.016 35.21 4.75 29.661 4.75v.5zM15.23 11.397C19.059 7.46 24.25 5.25 29.66 5.25v-.5c-5.548 0-10.868 2.266-14.789 6.298l.359.349zM9.25 26.245c0-5.57 2.152-10.911 5.98-14.848l-.358-.349c-3.92 4.032-6.122 9.498-6.122 15.197h.5zm20.411 30.687l.141-.206-.003-.002a70.354 70.354 0 01-10.285-9.108C14.36 42.02 9.25 34.409 9.25 26.246h-.5c0 8.359 5.221 16.091 10.397 21.709a70.846 70.846 0 009.477 8.537 41.677 41.677 0 00.896.646l.141-.206zM42.255 26.5c0 7.114-5.644 12.872-12.594 12.872v.5c7.237 0 13.094-5.992 13.094-13.372h-.5zM29.66 13.626c6.95 0 12.594 5.758 12.594 12.873h.5c0-7.38-5.857-13.373-13.094-13.373v.5zM17.068 26.5c0-7.115 5.643-12.873 12.593-12.873v-.5c-7.236 0-13.093 5.992-13.093 13.373h.5zM29.66 39.37c-6.95 0-12.593-5.758-12.593-12.872h-.5c0 7.38 5.857 13.372 13.093 13.372v-.5z"
        fill="#023D63"
      />
    </G>
    {privateCharger && (
      <G clipPath="url(#prefix__clip0)">
        <Path
          // eslint-disable-next-line max-len
          d="M50.594 15.324v.168l.155.063c1.188.488 2.001 1.559 2.008 2.782v7.364c0 1.215-.811 2.286-2 2.774a3.826 3.826 0 01-1.424.275H38.674c-.508 0-.995-.1-1.424-.275-1.195-.488-2-1.552-2-2.774v-7.364c0-1.224.805-2.294 2-2.781l.156-.064v-2.334c0-3.237 2.929-5.908 6.594-5.908 3.665 0 6.594 2.671 6.594 5.908v2.166zm-6.72 3.59h0c-.89.052-1.646.713-1.701 1.564a1.5 1.5 0 00.21.896c.067.121.1.231.1.335v1.286c0 .796.71 1.39 1.517 1.39.817 0 1.517-.602 1.517-1.39v-1.28c0-.112.03-.228.097-.336l.001-.003c.14-.236.22-.506.22-.793 0-.991-.92-1.73-1.96-1.67zm-4.62-3.883v.25H48.746v-2.123c0-2.395-2.16-4.295-4.746-4.295-2.594 0-4.746 1.907-4.746 4.295v1.873z"
          fill="url(#prefix__paint1_linear)"
          stroke="#0E1116"
          strokeWidth={0.8}
        />
      </G>
    )}
    {fastCharger && (
      <G>
        <Path
          d="M29.222 18L22 27h6.5l-.722 6L35 24h-6.5l.722-6z"
          fill="url(#prefix__paint0_linear)"
        />
        <Path
          d="M29.222 18L22 27h6.5l-.722 6L35 24h-6.5l.722-6z"
          stroke="url(#prefix__paint0_linear)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    )}

    <Defs>
      <LinearGradient
        id="prefix__paint0_linear"
        x1={28.661}
        y1={4}
        x2={28.661}
        y2={55.932}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={pinColorType ? pinColorTypes[pinColorType].startColor : '#007AFF'} />
        <Stop offset={0.979} stopColor={pinColorType ? pinColorTypes[pinColorType].stopColor : '#007AFF'} />
      </LinearGradient>

      <LinearGradient
        id="prefix__paint1_linear"
        x1={0.271}
        y1={22}
        x2={17.466}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#009AF0" />
        <Stop offset={1} stopColor="#008AEE" />
      </LinearGradient>
      <ClipPath id="prefix__clip0">
        <Path fill="#fff" d="M35 7h18v22H35z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default RootPin
