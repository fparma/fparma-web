import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { classnames } from '../utils'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
  isSmall?: boolean
  isError?: boolean
}

const input: StyledFunction<Partial<Props>> = styled.input

const StyledInput = input`
  && ::placeholder { 
    color: red !important;
  }
`

export const Input: React.SFC<Props> = ({
  name,
  isError,
  isSmall,
  ref,
  type = 'text',
  className,
  autoComplete = 'off',
  ...rest
}) => (
  <StyledInput
    type={type}
    name={name}
    className={classnames('input', className, { 'is-danger': isError, 'is-small': isSmall })}
    autoComplete={autoComplete}
    {...rest}
  />
)
