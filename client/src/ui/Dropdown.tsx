import * as React from 'react'
import { classnames } from './utils'

interface Props {
  className?: string
  isRight?: boolean
  isUp?: boolean
  isHoverable?: boolean
}

const Root: React.SFC<Props> = ({ className, children, ...props }) => (
  <section
    className={classnames('dropdown', className, {
      'is-right': props.isRight,
      'is-hoverable': props.isHoverable,
      'is-up': props.isUp,
    })}
  >
    {children}
  </section>
)

const Trigger: React.SFC = ({ children }) => <div className="dropdown-trigger">{children}</div>
const Content: React.SFC = ({ children }) => <div className="dropdown-content">{children}</div>
const Menu: React.SFC = ({ children }) => (
  <div className="dropdown-menu" role="menu">
    <Content>{children}</Content>
  </div>
)

const Divider: React.SFC = ({ children }) => <hr className="dropdown-divider" />
const Item: React.SFC = ({ children }) => <div className="dropdown-item">{children}</div>

export const Dropdown = {
  Root,
  Trigger,
  Menu,
  Divider,
  Item,
}
