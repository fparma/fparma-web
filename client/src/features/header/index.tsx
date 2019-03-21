import { Link } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Container, Hidden, Text } from '../../components'
import ShadowBackground from './ShadowBackground'

const Bar = styled(Container)`
  && {
    padding: 0 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`

const Header = () => (
  <ShadowBackground>
    <Bar>
      <Hidden mdDown>
        <Text.H2>FPARMA</Text.H2>
        <Link href="/">
          <Text.Span color="inherit">Login</Text.Span>
        </Link>
      </Hidden>
    </Bar>
  </ShadowBackground>
)

export default Header
