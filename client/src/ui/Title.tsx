import * as React from 'react'
import { classnames } from './utils'

interface Props {
  size?: number
  className?: string
}

const checkSize = (size: number) => {
  if (size < 1 || size > 6) throw new Error('Enter H-size betwen 1-6')
}

export const Title: React.SFC<Props> = ({ className, size = 3, children }) => {
  checkSize(size)
  const As = `h${size}` as any
  return <As className={classnames('title', `is-${size}`, className)}>{children}</As>
}

export const SubTitle: React.SFC<Props> = ({ className, size = 5, children }) => {
  checkSize(size)
  const As = `h${size}` as any
  return <As className={classnames('subtitle', `is-${size}`, className)}>{children}</As>
}
