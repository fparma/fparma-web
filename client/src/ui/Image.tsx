import * as React from 'react'

interface Props {
  src: string
  size?: number
}

export const Image = ({ src, size }: Props) => (
  <figure className={`image ${size ? `is-${size}x${size}` : ''}`}>
    <img src={src} />
  </figure>
)
