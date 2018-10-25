import * as React from 'react'
import { classnames } from './utils'

interface IColumnsProps {
  className?: string
  isCentered?: boolean
  isDesktop?: boolean
  isGapless?: boolean
  isMobile?: boolean
  isMultiline?: boolean
}

const Container: React.SFC<IColumnsProps> = ({ className, children, ...props }) => (
  <section
    className={classnames('columns', className, {
      'is-centered': props.isCentered,
      'is-desktop': props.isDesktop,
      'is-gapless': props.isGapless,
      'is-mobile': props.isMobile,
      'is-multiline': props.isMultiline,
    })}
  >
    {children}
  </section>
)

interface IColumnProps {
  className?: string
  size?: number
  isNarrow?: boolean
  isNarrowDesktop?: boolean
  isNarrowMobile?: boolean
  isNarrowTablet?: boolean
  isNarrowTouch?: boolean
  isNarrowWidescreen?: boolean
  isNarrowFullhd?: boolean
}

const Column: React.SFC<IColumnProps> = ({ className, size, children, ...props }) => {
  if (size != null && (size < 2 || size > 11)) throw new Error('Size must be value between 2-11')
  return (
    <div
      className={classnames('column', className, {
        [`is-${size}`]: !!size,
        'is-narrow': props.isNarrow,
        'is-narrow-desktop': props.isNarrowDesktop,
        'is-narrow-mobile': props.isNarrowMobile,
        'is-narrow-tablet': props.isNarrowTablet,
        'is-narrow-touch': props.isNarrowTouch,
        'is-narrow-widescreen': props.isNarrowWidescreen,
        'is-narrow-fullhd': props.isNarrowFullhd,
      })}
    >
      {children}
    </div>
  )
}

export const Grid = {
  Container,
  Column,
}
