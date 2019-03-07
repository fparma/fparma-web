import React from 'react'
import { Flex, Link, Button } from 'rebass'
import styled from 'styled-components'
import ShadowContainer from './ShadowBackground'

const Home = styled(Link)`
  text-decoration: none;
  font-weight: 700;
`

const Header = () => (
  <ShadowContainer>
    <Flex width={'100%'} pl={[4, 20, 40]} pr={[4, 20, 40]} justifyContent={'space-between'}>
      <Home fontSize={32} m={0} flex={1} alignSelf={'center'} color={'inherit'} href={'/'}>
        FPARMA
      </Home>
      <Flex flex={3} justifyContent={'center'}>
        <Link alignSelf={'center'}>Test</Link>
      </Flex>
      <Flex flex={1} flexDirection={'column'} justifyContent={'center'}>
        <Button alignSelf={'center'} fontSize={32} m={0} color={'inherit'} href={'/'}>
          Login
        </Button>
      </Flex>
    </Flex>
  </ShadowContainer>
)

export default Header
