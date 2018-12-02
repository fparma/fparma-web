import * as React from 'react'
import styled from 'styled-components'
import { Icon, ICONS } from '../Icon'
import { classnames } from '../utils'

interface IFieldProps {
  label?: string
  fullWidth?: boolean
  isError?: boolean
  iconLeft?: React.ReactElement<any>
  iconRight?: React.ReactElement<any>
}

const Error = styled(Icon)`
  color: rgba(255, 30, 15, 0.8);
`

export const Field: React.SFC<IFieldProps> = ({ label, iconLeft, iconRight, isError, fullWidth, children }) => (
  <div className={classnames('field')}>
    {label && <label className="label">{label}</label>}
    <div
      className={classnames(
        'control',
        { 'has-icons-left': !!iconLeft },
        { 'has-icons-right': isError || !!iconRight },
        { 'is-expanded': !!fullWidth }
      )}
    >
      {children}
      {iconLeft && React.cloneElement(iconLeft, { className: 'is-small is-left' })}
      {isError && <Error className="is-small is-right" icon={ICONS.faExclamationTriangle} />}
      {!isError && iconRight && React.cloneElement(iconRight, { className: 'is-small is-right' })}
    </div>
  </div>
)
