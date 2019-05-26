import { Link } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Container, Hidden, Text } from '../../components';
import { Icon, ICONS } from '../../components/Icon';
import ShadowBackground from './ShadowBackground';

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
      <Hidden only={['xs', 'sm']}>
        <Text.H2>FPARMA</Text.H2>
        <div style={{ width: '75%', height: '100%', display: 'flex', justifyContent: 'center' }}>
          <Link href="/">
            <Text.Span color="inherit">Login</Text.Span>
          </Link>
        </div>
        <Link href="/">
          <Text.Span color="inherit">Login</Text.Span>
        </Link>
      </Hidden>
      <Hidden only={['md', 'lg', 'xl']}>
        <Link href="/">
          <Icon icon={ICONS.hamburger} />
        </Link>
        <Text.H2 align="center" style={{ flexGrow: 2, marginLeft: '-36px' }}>
          FPARMA
        </Text.H2>
      </Hidden>
    </Bar>
  </ShadowBackground>
)

export default Header
