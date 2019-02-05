import * as React from 'react'
import { commonProps, CommonProps } from './Common'
import { classnames } from './utils'

interface Props extends CommonProps {
  className?: string
  isLarge?: boolean
  isMedium?: boolean
}

export const Section: React.SFC<Props> = ({ className, children, ...props }) => {
  return (
    <section
      className={classnames(
        'section',
        { 'is-large': props.isLarge, 'is-medium': props.isMedium },
        commonProps(props),
        className
      )}
    >
      {children}
    </section>
  )
}
