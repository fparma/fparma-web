import * as React from 'react'
import { CommonProps, commonProps } from './Common'
import { classnames } from './utils'

interface IButtonProps extends CommonProps {
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
  classnames(
    'button',
    {
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
    },
    commonProps(props),
    className
  )

interface IButtonsProps {
  className?: string
}

export const Buttons: React.SFC<IButtonsProps> = props => (
  <div className={classnames('buttons', props.className)}>{props.children}</div>
)

export const Button: React.SFC<IButtonProps> = ({ href, type, className, disabled, onClick, children, ...props }) => {
  return href ? (
    <a className={classes(className, props)} href={href} onClick={onClick as any}>
      {children}
    </a>
  ) : type ? (
    <input className={classes(className, props)} type={type} disabled={disabled} onClick={onClick as any} />
  ) : (
    <button className={classes(className, props)} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
