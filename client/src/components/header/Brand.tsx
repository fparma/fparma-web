import * as React from 'react'
import styled from 'styled-components'
import { Image, Navbar, Title } from '../../ui'

const NavTitle = styled(Title)`
  padding-left: 4px;
  margin-top: -3px;
`

const Emblem = styled(Image)`
  img {
    max-height: none !important;
  }
`

const Burger = styled(Navbar.Burger)`
  user-select: none;
  color: white;
  &:hover,
  &:focus {
    color: white;
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
`

interface IProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Brand = React.forwardRef((props: IProps, ref) => (
  <Navbar.Brand>
    <Navbar.Item to="/">
      <Emblem is48x48 src="/assets/emblem.svg" />
      <NavTitle size={2}>FPARMA</NavTitle>
    </Navbar.Item>
    <Burger ref={ref as any} onClick={props.onClick} />
  </Navbar.Brand>
))
