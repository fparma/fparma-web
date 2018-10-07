import * as React from 'react'
import { printClass } from './utils'

interface IFormProps {
  onSubmit: React.FormEventHandler
  children: React.ReactNode
}

interface IFieldProps {
  name: string
  children: React.ReactNode
  label?: string
  fullWidth?: boolean
  iconLeft?: React.ReactElement<any>
  iconRight?: React.ReactElement<any>
}

export const Form: React.SFC<IFormProps> = props => <form onSubmit={props.onSubmit}>{props.children}</form>

export const Field: React.SFC<IFieldProps> = props => (
  <div className={printClass('field')}>
    {props.label && (
      <label htmlFor={`id_${props.name}`} className="label">
        {props.label}
      </label>
    )}
    <div
      className={printClass(
        'control',
        { 'has-icons-left': !!props.iconLeft },
        { 'has-icons-right': !!props.iconRight },
        { 'is-expanded': !!props.fullWidth }
      )}
    >
      {props.children}
      {props.iconLeft && React.cloneElement(props.iconLeft, { className: 'is-small is-left' })}
      {props.iconRight && React.cloneElement(props.iconRight, { className: 'is-small is-right' })}
    </div>
  </div>
)
