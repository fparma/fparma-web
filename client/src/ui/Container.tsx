import * as React from 'react'
import { printClass } from './utils'

interface Props {
  className?: string
  isFluid?: boolean
  isFullhd?: boolean
  isWidescreen?: boolean
}

export const Container: React.SFC<Props> = ({ className, children, ...props }) => (
  <div
    className={printClass('container', className, {
      'is-fluid': props.isFluid,
      'is-fullhd': props.isFullhd,
      'is-widescreen': props.isWidescreen,
    })}
  >
    {children}
  </div>
)
