import * as React from 'react'
import { classnames } from '../utils'

interface IFieldProps {
  label?: string
  fullWidth?: boolean
  iconLeft?: React.ReactElement<any>
  iconRight?: React.ReactElement<any>
}

export const Field: React.SFC<IFieldProps> = props => (
  <div className={classnames('field')}>
    {props.label && <label className="label">{props.label}</label>}
    <div
      className={classnames(
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
