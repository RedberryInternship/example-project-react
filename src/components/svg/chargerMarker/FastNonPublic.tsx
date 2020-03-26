import * as React from 'react'
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg'
import {ChargerMarkerIcon} from '../../../../@types/allTypes'
import {Alert} from 'react-native'

function FastNonPublic({
  background,
  stroke,
  width,
  height,
}: ChargerMarkerIcon): React.ReactElement {
  return (
    <Svg
      width={width ?? 21}
      height={height ?? 25}
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
          d="M10.088 18.617c-.215 0-.43-.109-.537-.109-.322-.218-.536-.653-.322-1.088l.644-2.07-2.575-.979c-.322-.109-.537-.435-.644-.762-.108-.327 0-.653.322-.871l4.507-4.028c.322-.218.751-.327 1.18 0 .322.218.537.653.43 1.089l-.859 2.177 2.576.98c.536.218.751.762.536 1.197 0 .11-.107.327-.214.436l-4.4 3.81c-.215.11-.43.218-.644.218zM7.834 13.5l2.576.871c.214.109.429.218.536.436.108.217.108.435 0 .762l-.536 1.633 3.863-3.375-2.575-.762c-.537-.218-.752-.654-.537-1.198l.644-1.96-3.97 3.593z"
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

export default FastNonPublic
