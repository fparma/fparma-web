import { Props as FAProps } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { spaceEnterClick } from '../util/spaceEnterClick'
import { Icon } from './Icon'
import { classnames } from './utils'

interface TabsProps {
  className?: string
  isSmall?: boolean
  isMedium?: boolean
  isLarge?: boolean
  isBoxed?: boolean
  isFullWidth?: boolean
  isCentered?: boolean
  isRight?: boolean
}

interface TabProps extends Partial<FAProps> {
  text?: string
  isActive?: boolean
  onClick?: () => void
}

export const Tab: React.SFC<TabProps> = ({ text, className, isActive, onClick, ...rest }) => (
  <li className={classnames(className, { 'is-active': isActive })}>
    <a onKeyDown={spaceEnterClick(onClick)} tabIndex={0} onClick={onClick}>
      {rest.icon ? <Icon {...rest as any} /> : null}
      {text}
    </a>
  </li>
)

export const Tabs: React.SFC<TabsProps> = ({ children, className, ...props }) => (
  <div
    className={classnames('tabs', className, {
      'is-small': props.isSmall,
      'is-medium': props.isMedium,
      'is-large': props.isLarge,
      'is-boxed': props.isBoxed,
      'is-fullwidth': props.isFullWidth,
      'is-centered': props.isCentered,
      'is-right': props.isRight,
    })}
  >
    <ul>{children}</ul>
  </div>
)
