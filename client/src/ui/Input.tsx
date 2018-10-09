import * as React from 'react'
import { printClass } from './utils'

interface IInputProps {
  className: string
}

export const Input: React.SFC<IInputProps> = ({className}) => {
  return <input type="text" className={printClass('input', className)} />
}
