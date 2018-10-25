import * as React from 'react'
import { printClass } from './utils'

interface Props {
  className?: string
  isLarge?: boolean
  isMedium?: boolean
}

export const Section: React.SFC<Props> = ({ className, children, ...props }) => {
  return (
    <section className={printClass('section', className, { 'is-large': props.isLarge, 'is-medium': props.isMedium })}>
      {children}
    </section>
  )
}
