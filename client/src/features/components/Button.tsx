import ButtonBase, { ButtonProps } from '@material-ui/core/Button'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled(ButtonBase)`
  && {
    text-transform: none;
  }
`

const Outlined: React.SFC<ButtonProps> = ({ children, className, ...rest }) => (
  <StyledButton className={className} {...rest}>
    {children}
  </StyledButton>
)
Outlined.defaultProps = { color: 'secondary', variant: 'outlined' } as ButtonProps

export abstract class Button {
  static Normal = Outlined
}
