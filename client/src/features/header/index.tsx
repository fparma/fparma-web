import React from 'react'
import styled from 'styled-components'
import { Button, Text } from '../components'
import ContainerBase from '../components/Container'
import ShadowBackground from './ShadowBackground'

const Home = styled(Text.H4)`
  && {
    line-height: 0.7;
    font-weight: 700;
  }
`

const Container = styled(ContainerBase)`
  && {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const Header = () => (
  <ShadowBackground>
    <Container>
      <Text.H4>FPARMA</Text.H4>
      <div>
        <Button.Normal>Login</Button.Normal>
        <Button.Normal>Login</Button.Normal>
      </div>
      <div>
        <Button.Normal>Login</Button.Normal>
      </div>
    </Container>
  </ShadowBackground>
)

export default Header
