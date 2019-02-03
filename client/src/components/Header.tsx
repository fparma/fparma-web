import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'
import { withClickOutSide } from '../hoc/OutsideClick'
import { Container, Navbar } from '../ui'
import './header/Header.scss'
import { Brand, LeftMenu, RightMenu } from './header/index'

const Menu = withClickOutSide(Navbar.Menu)

const Navigation = styled(Navbar.Main)`
  @media screen and (min-width: 1088px) {
    padding: 0.4rem 0;
  }
`

class Header extends React.PureComponent<RouteComponentProps, { menuActive: boolean }> {
  state = { menuActive: false }
  removeHistoryListener: Function | null = null

  componentDidMount() {
    const { history } = this.props
    this.removeHistoryListener = history.listen(this.closeMenu) as Function
  }

  componentWillUnmount() {
    this.removeHistoryListener!()
  }

  toggleMenu = () => {
    this.setState(({ menuActive }) => ({ menuActive: !menuActive }))
  }

  closeMenu = () => {
    this.state.menuActive && this.toggleMenu()
  }

  brandRef = React.createRef()

  render = () => (
    <Navigation hasShadow mobileMenuOpen={this.state.menuActive}>
      <Container>
        <Brand ref={this.brandRef} onClick={this.toggleMenu} />
        <Menu onOutSideClick={this.closeMenu} excempt={this.brandRef} className="app-menu-links">
          {{ start: LeftMenu, end: RightMenu }}
        </Menu>
      </Container>
    </Navigation>
  )
}

const routerHeader = withRouter(Header)
export { routerHeader as Header }
