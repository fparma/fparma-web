import * as React from 'react'
import { printClass } from './utils'

interface Props {
  size?: number
  className?: string
  children: React.ReactNode
}

export const Title: React.SFC<Props> = ({ className, size = 3, children }) => {
  const As = `h${size}`
  return <As className={printClass('title', `is-${size}`, className)}>{children}</As>
}

export const SubTitle: React.SFC<Props> = ({ className, size = 5, children }) => {
  const As = `h${size}`
  return <As className={printClass('subtitle', `is-${size}`, className)}>{children}</As>
}
