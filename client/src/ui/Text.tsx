import * as React from 'react'
import { classnames } from './utils'

interface Props {
  className?: string
  isError?: boolean
}

export const Text: React.SFC<Props> = ({ className, children, ...props }) => {
  return <span className={classnames(className, { 'is-text-danger': props.isError })}>{children}</span>
}
