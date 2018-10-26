import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { classnames } from '../utils'

interface Props
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  className?: string
}

const text: StyledFunction<Partial<Props>> = styled.textarea

const StyledText = text`
  ::placeholder {
    color: rgba(0,0,0, 0.6) !important;
  }
`

export const TextArea: React.SFC<Props> = ({ name, ref, className, autoComplete = 'off', ...rest }) => (
  <StyledText name={name} className={classnames('textarea', className)} {...rest} />
)
