import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'
import { withClickOutSide } from '../components/OutsideClick'
import { Container, Navbar } from '../ui'
import { printClass } from '../ui/utils'
import './header/Header.scss'
import { Brand, LeftMenu, RightMenu } from './header/index'

const Menu = withClickOutSide(Navbar.Menu)

const Navigation = styled(Navbar.Main)`
  @media screen and (min-width: 1088px) {
    padding: 1rem 0;
  }
`

class Header extends React.Component<RouteComponentProps> {
  removeHistoryListener: Function
  state = { menuActive: false }

  componentDidMount() {
    const { history } = this.props
    this.removeHistoryListener = history.listen(() => this.off()) as Function
  }
  componentWillUnmount = () => this.removeHistoryListener()

  toggle = () => {
    this.setState({ menuActive: !this.state.menuActive })
  }

  off = () => {
    this.state.menuActive && this.setState({ menuActive: false })
  }

  render = () => (
    <Navigation modifiers={['has-shadow']}>
      <Container>
        <Brand onClick={this.toggle} />
        <Menu
          onOutSideClick={this.off}
          className={printClass('app-menu-links', { 'is-active': this.state.menuActive })}
        >
          {{ start: LeftMenu, end: RightMenu }}
        </Menu>
      </Container>
    </Navigation>
  )
}

const routerHeader = withRouter(Header)
export { routerHeader as Header }
