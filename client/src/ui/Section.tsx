import * as React from 'react'
import { classnames } from './utils'

interface Props {
  className?: string
  isLarge?: boolean
  isMedium?: boolean
}

export const Section: React.SFC<Props> = ({ className, children, ...props }) => {
  return (
    <section className={classnames('section', className, { 'is-large': props.isLarge, 'is-medium': props.isMedium })}>
      {children}
    </section>
  )
}
