import * as React from 'react'

interface IProps {
  modifiers?: string[]
  className?: string
  children: React.ReactNode
}

const print = (arr: undefined | string[]) => (arr || []).join(' ')

const Burger = () => (
  <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
)

const Main: React.SFC<IProps> = ({ className, modifiers, children }) => (
  <nav className={`navbar ${className} ${print(modifiers)}`} role="navigation" aria-label="main navigation">
    {children}
  </nav>
)

const Brand = (props: any) => <div className="navbar-brand">{props.children}</div>

const Item = (props: IProps) => <a className="navbar-item">{props.children}</a>

const Menu = (props: { children: { start: React.ReactNode; end: React.ReactNode } }) => (
  <div className="navbar-menu">
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
