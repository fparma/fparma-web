import * as React from 'react'
import { Navbar, Container, Title, Image, ICONS, Icon } from '../ui'
import styled from 'styled-components'
import { LeftMenu, RightMenu } from './header/index'

const Navigation = styled(Navbar.Main)`
  @media (min-width: 768px) {
    padding: 1rem 0;
  }
`

const NavTitle = styled(Title)`
  padding-left: 4px;
`

export class Header extends React.Component {
  render = () => (
    <Navigation modifiers={['has-shadow']}>
      <Container>
        <Navbar.Brand>
          <Navbar.Item>
            <Image src="/assets/logo_fp_128px.png" />
            <NavTitle>FPARMA</NavTitle>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>{{ start: LeftMenu, end: RightMenu }}</Navbar.Menu>
      </Container>
    </Navigation>
  )
}
