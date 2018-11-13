import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { classnames } from '../utils'
import { isError } from 'util'

interface Props
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  className?: string
  isError?: boolean
}

const text: StyledFunction<Partial<Props>> = styled.textarea

const StyledText = text`
  && ::placeholder {
    color: rgba(0,0,0, 0.2);
  }
`

export const TextArea: React.SFC<Props> = ({ name, ref, className, isError, autoComplete = 'off', ...rest }) => (
  <StyledText name={name} className={classnames('textarea', className, { 'is-danger': isError })} {...rest} />
)
