import * as React from 'react'
import { classnames } from './utils'

interface Props {
  className?: string
  isFluid?: boolean
  isFullhd?: boolean
  isWidescreen?: boolean
  hidden?: boolean
}

export const Container: React.SFC<Props> = ({ className, children, ...props }) => (
  <div
    className={classnames('container', className, {
      'is-fluid': props.isFluid,
      'is-fullhd': props.isFullhd,
      'is-widescreen': props.isWidescreen,
    })}
    hidden={props.hidden}
  >
    {children}
  </div>
)
