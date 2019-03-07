import React from 'react'
import { Box, Flex, Heading } from 'rebass'
import styled from 'styled-components'

const ShadowContainer = styled(Flex)`
  height: 80px;
  border-bottom: 1px solid rgba(225, 255, 255, 0.4);

  &:before {
    z-index: -5;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 80px;
    content: '';
    background-image: linear-gradient(to top, transparent, #000);
    opacity: 0.5;
  }
`

export default ShadowContainer
