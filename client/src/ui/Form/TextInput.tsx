import * as React from 'react'
import { printClass } from '../utils';

interface IInputProps {
  className?: string
  name?: string
}

export const Input: React.SFC<IInputProps> = ({ name, className }) =>
  <input type="text" name={name} className={printClass('input', className)} />
