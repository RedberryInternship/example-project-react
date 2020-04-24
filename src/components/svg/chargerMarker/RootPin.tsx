import * as React from 'react'
import Svg, {
  G,
  Path,
  Defs,
  Ellipse,
  Stop,
  LinearGradient,
  Text,
  ClipPath,
} from 'react-native-svg'

import {
  ChargerMarkerIcon,
  ChargerMarkerColor,
} from '../../../../@types/allTypes.d'
import {determineTimePeriod} from 'utils'

const pinColorTypes = {
  [ChargerMarkerColor.group]: {startColor: '#019AF0', stopColor: '#1066E4'},
  [ChargerMarkerColor.free]: {startColor: '#3BEF55', stopColor: '#33D74B'},
  [ChargerMarkerColor.busy]: {startColor: '#FFDA00', stopColor: '#FFEA72'},
  [ChargerMarkerColor.notWorking]: {
    startColor: '#FF6F6F',
    stopColor: '#FF3B3B',
  },
}
function RootPin({
  width,
  height,
  privateCharger,
  fastCharger,
  groupChargerCount,
  pinColorType,
}: ChargerMarkerIcon): React.ReactElement {
  return (
    <Svg
      width={width ?? 40}
      height={height ?? 55}
      viewBox="0 0 58 68"
      fill="none"
    >
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
          d="M28.661 55.932S49.323 41.77 49.323 25.245c0-5.635-2.177-11.038-6.052-15.023C39.396 6.239 34.141 4 28.661 4c-5.48 0-10.735 2.238-14.61 6.223C10.178 14.207 8 19.61 8 25.245 8 41.77 28.661 55.932 28.661 55.932zm0-17.31c7.094 0 12.844-5.876 12.844-13.123 0-7.248-5.75-13.123-12.844-13.123-7.093 0-12.843 5.875-12.843 13.123 0 7.247 5.75 13.122 12.843 13.122z"
          fill="url(#prefix__paint0_linear)"
          strokeWidth={0.5}
          stroke={determineTimePeriod() ? '#00000033' : '#fff'}
        />
      </G>
      {privateCharger && (
        <G clipPath="url(#prefix__clip0)">
          <Path
            d="M50.594 15.324v.168l.155.063c1.188.488 2.001 1.559 2.008 2.782v7.364c0 1.215-.811 2.286-2 2.774a3.826 3.826 0 01-1.424.275H38.674c-.508 0-.995-.1-1.424-.275-1.195-.488-2-1.552-2-2.774v-7.364c0-1.224.805-2.294 2-2.781l.156-.064v-2.334c0-3.237 2.929-5.908 6.594-5.908 3.665 0 6.594 2.671 6.594 5.908v2.166zm-6.72 3.59h0c-.89.052-1.646.713-1.701 1.564a1.5 1.5 0 00.21.896c.067.121.1.231.1.335v1.286c0 .796.71 1.39 1.517 1.39.817 0 1.517-.602 1.517-1.39v-1.28c0-.112.03-.228.097-.336l.001-.003c.14-.236.22-.506.22-.793 0-.991-.92-1.73-1.96-1.67zm-4.62-3.883v.25H48.746v-2.123c0-2.395-2.16-4.295-4.746-4.295-2.594 0-4.746 1.907-4.746 4.295v1.873z"
            fill="url(#prefix__paint0_linear)"
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
          <Stop stopColor={pinColorTypes[pinColorType].startColor} />
          <Stop
            offset={0.979}
            stopColor={pinColorTypes[pinColorType].stopColor}
          />
        </LinearGradient>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M35 7h18v22H35z" />
        </ClipPath>
      </Defs>
      {pinColorType === ChargerMarkerColor.group && !!groupChargerCount && (
        <Text
          alignmentBaseline={'center'}
          fontSize={23}
          fontWeight={'bold'}
          textAnchor="middle"
          x={'50%'}
          y={19}
          verticalAlign={'center'}
          strokeWidth={1}
          baselineShift={'middle'}
          fill="url(#prefix__paint0_linear)"
          stroke="url(#prefix__paint0_linear)"
        >
          {groupChargerCount}
        </Text>
      )}
    </Svg>
  )
}

export default RootPin
