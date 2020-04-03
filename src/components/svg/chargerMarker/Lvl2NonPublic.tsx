import * as React from 'react'
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg'

import {ChargerMarkerIcon} from 'allTypes'

function Lvl2NonPublic({
  background,
  stroke,
  width,
  height,
}: ChargerMarkerIcon): React.ReactElement {
  return (
    <Svg
      width={width ?? 22}
      height={height ?? 27}
      viewBox="0 0 22 27"
      fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M11.054 26.565L.322 13.5 11.054.436 21.678 13.5 11.054 26.565z"
          fill={background}
        />
        <Path
          d="M11.054 26.565L.322 13.5 11.054.436 21.678 13.5 11.054 26.565z"
          stroke="#fff"
          strokeWidth={1}
          strokeMiterlimit={10}
        />
        <Path
          d="M13.951 10.996V8.71h-1.18v2.286h-.966V8.819h-1.288v2.177H9.444V8.71H8.156v2.395c-.751.218-1.18.98-1.288 1.742v1.633c0 .762.43 1.306 1.073 1.633l2.469 1.198.107.108v1.96h1.288V17.31l.107-.108 2.254-1.09c.644-.326.966-.979.858-1.632v-1.633c.108-.871-.429-1.524-1.073-1.851zm0 3.375a.6.6 0 01-.322.544l-2.253 1.09a.323.323 0 01-.43 0l-2.36-1.09a.6.6 0 01-.323-.544v-1.633c0-.327.215-.544.537-.544h4.722c.322 0 .537.217.537.544l-.108 1.633z"
          fill={stroke}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h22v27H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Lvl2NonPublic
