import * as React from 'react'
import { classnames } from './utils'

export interface TextProps {
  size?: number
  className?: string
  isWarning?: boolean
  isError?: boolean
  hasTextCentered?: boolean
  hasTextJustified?: boolean
  hasTextLeft?: boolean
  hasTextRight?: boolean
  isCapitalized?: boolean
  isLowercase?: boolean
  isUppercase?: boolean
  isItalic?: boolean
}

export const Text: React.SFC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={classnames(className, {
        [`is-size-${props.size}`]: !!props.size,
        'has-text-warning': props.isWarning,
        'has-text-danger': props.isError,
        'has-text-centered': props.hasTextCentered,
        'has-text-justified': props.hasTextJustified,
        'has-text-left': props.hasTextLeft,
        'has-text-right': props.hasTextRight,
        'is-capitalized': props.isCapitalized,
        'is-uppercase': props.isUppercase,
        'is-lowercase': props.isLowercase,
        'is-italic': props.isItalic,
      })}
    >
      {children}
    </span>
  )
}