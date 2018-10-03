import * as React from 'react'
import { printClass } from './utils'

interface Props {
  src: string
  size?: number
}

export const Image = ({ src, size }: Props) => {
  const s = size ? `is-${size}x${size}` : ''
  return (
    <figure className={printClass('image', s)}>
      <img src={src} />
    </figure>
  )
}
