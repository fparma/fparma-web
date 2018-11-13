import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { classnames } from '../utils'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
  isError?: boolean
}

const input: StyledFunction<Partial<Props>> = styled.input

const StyledInput = input`
  && ::placeholder { 
    color: rgba(0,0,0, 0.4);
  }
`

export const Input: React.SFC<Props> = ({
  name,
  isError,
  ref,
  type = 'text',
  className,
  autoComplete = 'off',
  ...rest
}) => (
  <StyledInput
    type={type}
    name={name}
    className={classnames('input', className, { 'is-danger': isError })}
    autoComplete={autoComplete}
    {...rest}
  />
)
