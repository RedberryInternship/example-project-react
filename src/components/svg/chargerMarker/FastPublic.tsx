import * as React from 'react'
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg'

import {ChargerMarkerIcon} from 'allTypes'

function FastPublic({
  background,
  stroke,
  width,
  height,
}: ChargerMarkerIcon): React.ReactElement {
  return (
    <Svg
      width={width ?? 21}
      height={height ?? 25}
      viewBox="0 0 21 25"
      fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M10.16 24.22l-7-7c-3.88-3.88-3.88-10.18 0-14.06 3.88-3.88 10.18-3.88 14.06 0 3.88 3.88 3.88 10.17 0 14.05l-7.06 7.01z"
          fill={background}
        />
        <Path
          d="M10.16 24.22l-7-7c-3.88-3.88-3.88-10.18 0-14.06 3.88-3.88 10.18-3.88 14.06 0 3.88 3.88 3.88 10.17 0 14.05l-7.06 7.01z"
          stroke="#fff"
          strokeWidth={1}
          strokeMiterlimit={10}
        />
        <Path
          d="M9.39 14.43c-.18-.01-.36-.06-.51-.16a.887.887 0 01-.34-1l.52-1.5-2-.71a.88.88 0 01-.58-.67c-.06-.31.04-.63.28-.84l3.7-3.34a.9.9 0 011.45 1l-.6 1.72 2 .7c.3.1.53.36.59.68.06.32-.05.64-.3.85l-3.63 3.05c-.16.14-.37.21-.58.22zm-1.6-4.35l1.87.66c.47.16.72.67.56 1.14l-.31.88 2.62-2.26-1.85-.65a.881.881 0 01-.56-1.11c0-.01.01-.02.01-.03l.37-1.07-2.71 2.44z"
          fill={stroke}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h20.38v24.57H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default FastPublic
