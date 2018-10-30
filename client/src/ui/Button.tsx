import * as React from 'react'
import { classnames } from './utils'

interface IButtonProps {
  className?: string
  disabled?: boolean
  href?: string
  isActive?: boolean
  isFocused?: boolean
  isFullwidth?: boolean
  isLarge?: boolean
  isLink?: boolean
  isLoading?: boolean
  isMedium?: boolean
  isNormal?: boolean
  isOutlined?: boolean
  isRounded?: boolean
  isSmall?: boolean
  isStatic?: boolean
  isText?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'reset' | 'submit'
}

const classes = (className: string | undefined, props: IButtonProps) =>
  classnames('button', className, {
    'is-active': props.isActive,
    'is-focused': props.isFocused,
    'is-fullwidth': props.isFullwidth,
    'is-large': props.isLarge,
    'is-link': props.isLink,
    'is-loading': props.isLoading,
    'is-medium': props.isMedium,
    'is-normal': props.isNormal,
    'is-outlined': props.isOutlined,
    'is-rounded': props.isRounded,
    'is-small': props.isSmall,
    'is-static': props.isStatic,
    'is-text': props.isText,
  })

export const Button: React.SFC<IButtonProps> = ({ href, type, className, disabled, onClick, children, ...props }) =>
  href ? (
    <a className={classes(className, props)} href={href} {...props}>
      {children}
    </a>
  ) : type ? (
    <input className={classes(className, props)} type={type} {...props} />
  ) : (
    <button className={classes(className, props)} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
