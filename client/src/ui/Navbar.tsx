import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { printClass } from './utils'

interface IProps {
  className?: string
  modifiers?: string[]
  children: React.ReactNode
}

type BurgerProps = { className?: string; onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }
const Burger: React.SFC<BurgerProps> = props => (
  <a
    role="button"
    tabIndex={0}
    onClick={props.onClick}
    className={printClass('navbar-burger', props.className)}
    aria-label="menu"
    aria-expanded="false"
  >
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
)

const Main: React.SFC<IProps> = ({ className, modifiers = [], children }) => (
  <nav className={printClass('navbar', className, ...modifiers)} role="navigation" aria-label="main navigation">
    {children}
  </nav>
)

const Brand = (props: any) => <div className="navbar-brand">{props.children}</div>

const Item = (props: LinkProps) => (
  <Link className="navbar-item" {...props}>
    {props.children}
  </Link>
)

const Menu = (props: { children: { start: React.ReactNode; end: React.ReactNode }; className: string }) => (
  <div className={printClass('navbar-menu', props.className)}>
    <div className="navbar-start">{props.children.start}</div>
    <div className="navbar-end">{props.children.end}</div>
  </div>
)

export const Navbar = {
  Main,
  Burger,
  Brand,
  Item,
  Menu,
}
