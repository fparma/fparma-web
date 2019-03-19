import React from 'react'
import styled from 'styled-components'
import { Text, Container } from '../../components'
import ShadowBackground from './ShadowBackground'
import { Link } from '@material-ui/core'

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
      <Text.H2>FPARMA</Text.H2>
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
