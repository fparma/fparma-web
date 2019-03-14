import React from 'react'
import styled from 'styled-components'
import { Text, Container } from '../../components'
import ShadowBackground from './ShadowBackground'
import { Link } from '@material-ui/core'
import ImageBackground from './ImageBackground'

const Home = styled(Text.H4)`
  && {
    line-height: 0.7;
    font-weight: 700;
  }
`

const Bar = styled(Container)`
  && {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const Header = () => (
  <ShadowBackground>
    <Bar>
      <Text.H4>FPARMA</Text.H4>
      <div>
        <Text.Span>
          <Link color="primary" href="/">
            Login
          </Link>
        </Text.Span>
      </div>
    </Bar>
  </ShadowBackground>
)

export default Header
