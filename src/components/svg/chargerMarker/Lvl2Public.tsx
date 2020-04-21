import * as React from 'react'
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg'

import {ChargerMarkerIcon} from 'allTypes'

function Lvl2Public({
  width,
  height,
  background,
  stroke,
}: ChargerMarkerIcon): React.ReactElement {
  return (
    <Svg
      width={width ?? 21}
      height={height ?? 25}
      viewBox="0 0 21 25"
      fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M17.22 3.16C13.34-.72 7.04-.72 3.16 3.16c-3.88 3.88-3.88 10.18 0 14.06l7 7 7-7c3.87-3.88 3.9-10.15.06-14.06z"
          fill={background}
        />
        <Path
          d="M17.22 3.16C13.34-.72 7.04-.72 3.16 3.16c-3.88 3.88-3.88 10.18 0 14.06l7 7 7-7c3.87-3.88 3.9-10.15.06-14.06z"
          stroke="#fff"
          strokeWidth={1}
          strokeMiterlimit={10}
        />
        <Path
          d="M12.9 7.49V5.36h-1.14v2.05h-.93V5.36H9.69v2.05h-1V5.36H7.5v2.13c-.68.22-1.14.86-1.15 1.57v1.51c.01.65.4 1.24 1 1.49l2.25 1.06.14.06v1.83h1.14v-1.84l.12-.06 2.14-1c.55-.3.89-.9.86-1.53V9.06c.01-.7-.44-1.33-1.1-1.57zm0 3.09c0 .2-.11.38-.29.46l-2.14 1.05c-.14.07-.3.07-.44 0l-2.24-1.08a.505.505 0 01-.3-.46V9.06c0-.28.23-.51.51-.51h4.38c.28-.01.51.22.52.5v1.53z"
          fill={stroke}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20.33v24.58H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Lvl2Public
