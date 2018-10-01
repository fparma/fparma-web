import * as React from 'react'
import { Navbar, Title } from '../../ui'
import styled from 'styled-components'

interface Props {
  onBurgerClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const NavTitle = styled(Title)`
  padding-left: 4px;
`

const Burger = styled(Navbar.Burger)`
  color: white;
  &:hover, &:focus {
    color: white;
    background-color: rgba(255,255,255,0.2) !important;
  }
`

export const Brand = (props: Props) =>
  <Navbar.Brand>
    <Navbar.Item>
      {/* <Image src="/assets/logo_fp_128px.png" /> */}
      <NavTitle>FPARMA</NavTitle>
    </Navbar.Item>
    <Burger onClick={props.onBurgerClick} />
  </Navbar.Brand>
