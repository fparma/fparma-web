import * as React from 'react'
import { Navbar, Container } from '../ui'
import styled from 'styled-components'
import { LeftMenu, RightMenu, Brand } from './header/index'

import './header/Header.scss'

const Navigation = styled(Navbar.Main)`
  @media screen and (min-width: 1088px) {
    padding: 1rem 0;
  }
`

export class Header extends React.Component {
  state = { menuActive: false }

  toggle = () => {
    this.setState({ menuActive: !this.state.menuActive })
  }

  render = () => (
    <Navigation modifiers={['has-shadow']}>
      <Container>
        <Brand onBurgerClick={this.toggle}></Brand>
        <Navbar.Menu className={`app-menu-links ${this.state.menuActive ? 'is-active' : ''}`}
        >{{ start: LeftMenu, end: RightMenu }}</Navbar.Menu>
      </Container>
    </Navigation>
  )
}
