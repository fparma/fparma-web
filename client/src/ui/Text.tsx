import * as React from 'react'
import { classnames } from './utils'

interface Props {
  className?: string
  isWarning?: boolean
}

export const Text: React.SFC<Props> = ({ className, children, ...props }) => {
  return <span className={classnames(className, { 'has-text-warning': props.isWarning })}>{children}</span>
}
