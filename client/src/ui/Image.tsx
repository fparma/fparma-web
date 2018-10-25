import * as React from 'react'
import { printClass } from './utils'

interface Props {
  src: string
  className?: string
  is1by1?: boolean
  is1by2?: boolean
  is1by3?: boolean
  is2by1?: boolean
  is2by3?: boolean
  is3by1?: boolean
  is3by2?: boolean
  is3by4?: boolean
  is3by5?: boolean
  is4by3?: boolean
  is4by5?: boolean
  is5by3?: boolean
  is5by4?: boolean
  is9by16?: boolean
  is16x16?: boolean
  is24x24?: boolean
  is32x32?: boolean
  is48x48?: boolean
  is64x64?: boolean
  is96x96?: boolean
  is128x128?: boolean
  isSquare?: boolean
}

export const Image: React.SFC<Props> = ({ className, src, ...props }) => {
  return (
    <figure
      className={printClass('image', className, {
        'is-1by1': props.is1by1,
        'is-1by2': props.is1by2,
        'is-1by3': props.is1by3,
        'is-2by1': props.is2by1,
        'is-2by3': props.is2by3,
        'is-3by1': props.is3by1,
        'is-3by2': props.is3by2,
        'is-3by4': props.is3by4,
        'is-3by5': props.is3by5,
        'is-4by3': props.is4by3,
        'is-4by5': props.is4by5,
        'is-5by3': props.is5by3,
        'is-5by4': props.is5by4,
        'is-9by16': props.is9by16,
        'is-16x16': props.is16x16,
        'is-24x24': props.is24x24,
        'is-32x32': props.is32x32,
        'is-48x48': props.is48x48,
        'is-64x64': props.is64x64,
        'is-96x96': props.is96x96,
        'is-128x128': props.is128x128,
        'is-square': props.isSquare,
      })}
    >
      <img src={src} />
    </figure>
  )
}
