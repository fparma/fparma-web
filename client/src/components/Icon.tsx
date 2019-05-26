import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconBase from '@material-ui/core/Icon';
import React from 'react';
import styled from 'styled-components';
import { Text } from './Text';

export const ICONS = {
  hamburger: faBars,
}

library.add(...Object.values(ICONS))

const StyledIcon = styled(IconBase)`
  && {
    display: flex;
    justify-content: center;
  }
`

interface Props {
  icon: IconDefinition
}

export const Icon: React.SFC<Props> = ({ icon }) => (
  <StyledIcon>
    <Text.Span>
      <FontAwesomeIcon icon={icon} />
    </Text.Span>
  </StyledIcon>
)

