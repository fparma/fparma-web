import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { classnames } from '../utils'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
}

const input: StyledFunction<Partial<Props>> = styled.input

const StyledInput = input`
  ::placeholder {
    color: rgba(0,0,0, 0.6) !important;
  }
`

export const Input: React.SFC<Props> = ({ name, ref, className, autoComplete = 'off', ...rest }) => (
  <StyledInput
    type="text"
    name={name}
    className={classnames('input', className)}
    autoComplete={autoComplete}
    {...rest}
  />
)
