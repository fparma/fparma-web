import * as React from 'react'
import { classnames } from '../utils'
import { InputElement } from './index'

interface IInputProps extends InputElement {
  className?: string
  name?: string
}

export const Input: React.SFC<IInputProps> = ({ name, className, autoComplete = 'off', ...rest }) => (
  <input type="text" name={name} className={classnames('input', className)} autoComplete={autoComplete} {...rest} />
)
