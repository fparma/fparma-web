import * as React from 'react'
import { printClass } from './utils'

interface Props {
  isFluid?: boolean
  isFullhd?: boolean
  isWidescreen?: boolean
}

export const Container: React.SFC<Props> = ({ isFluid, isFullhd, isWidescreen, children }) => (
  <div
    className={printClass('container', {
      'is-fluid': isFluid,
      'is-fullhd': isFullhd,
      'is-widescreen': isWidescreen,
    })}
  >
    {children}
  </div>
)
