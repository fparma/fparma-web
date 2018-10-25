import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { classnames } from './utils'

interface IProps {
  className?: string
  children: React.ReactNode
}

const Context = React.createContext<{ mobileMenuOpen: boolean }>({ mobileMenuOpen: false })

const Menu = (props: { children: { start: React.ReactNode; end: React.ReactNode }; className: string }) => (
  <Context.Consumer>
    {state => (
      <div className={classnames('navbar-menu', props.className, { 'is-active': state.mobileMenuOpen })}>
        <div className="navbar-start">{props.children.start}</div>
        <div className="navbar-end">{props.children.end}</div>
      </div>
    )}
  </Context.Consumer>
)

interface MainProps extends IProps {
  hasShadow: boolean
  mobileMenuOpen: boolean
}

const Main: React.SFC<MainProps> = ({ className, hasShadow, children, mobileMenuOpen }) => (
  <Context.Provider value={{ mobileMenuOpen }}>
    <nav
      className={classnames('navbar', className, { 'has-shadow': hasShadow })}
      role="navigation"
      aria-label="main navigation"
    >
      {children}
    </nav>
  </Context.Provider>
)

interface BurgerProps {
  className?: string
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const Burger = React.forwardRef((props: BurgerProps, ref) => (
  <Context.Consumer>
    {state => (
      <a
        ref={ref as any}
        role="button"
        tabIndex={0}
        onClick={props.onClick}
        className={classnames('navbar-burger', props.className, { 'is-active': state.mobileMenuOpen })}
        aria-label="menu"
        aria-expanded={state.mobileMenuOpen}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    )}
  </Context.Consumer>
))

const Brand = (props: IProps) => <div className={classnames('navbar-brand', props.className)}>{props.children}</div>

const Item = (props: LinkProps) => (
  <Link className="navbar-item" {...props}>
    {props.children}
  </Link>
)

export const Navbar = {
  Main,
  Burger,
  Brand,
  Item,
  Menu,
}
