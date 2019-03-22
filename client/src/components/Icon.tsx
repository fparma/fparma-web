import React from 'react'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import IconBase from '@material-ui/core/Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Text } from './Text'
import styled from 'styled-components'

export const ICONS = {
  bar: faBars,
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

export const Icon: React.SFC<Props> = ({ icon }) => {
  return (
    <StyledIcon>
      <Text.Span>
        <FontAwesomeIcon icon={icon} />
      </Text.Span>
    </StyledIcon>
  )
}
