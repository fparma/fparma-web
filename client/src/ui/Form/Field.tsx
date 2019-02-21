import * as React from 'react'
import styled from 'styled-components'
import { Icon, ICONS } from '../Icon'
import { classnames } from '../utils'

interface IFieldProps {
  label?: string
  isFullWidth?: boolean
  isError?: boolean
  iconLeft?: React.ReactElement<any>
  iconRight?: React.ReactElement<any>
}

const Error = styled(Icon)`
  color: rgba(255, 30, 15, 0.8);
`

const ControlContainer = styled.div``

interface FieldContainerProps {
  hasAddons?: boolean
}
const FieldContainer: React.SFC<FieldContainerProps> = ({ hasAddons, children }) => (
  <div className={classnames('field', { 'has-addons': hasAddons })}>{children}</div>
)

const FieldLabel: React.SFC = ({ children }) => <label className="label">{children}</label>
const FieldControl: React.SFC<IFieldProps> = ({ isError, iconLeft, iconRight, isFullWidth, children }) => (
  <ControlContainer
    className={classnames('control', {
      'has-icons-left': !!iconLeft,
      'has-icons-right': isError || !!iconRight,
      'is-expanded': !!isFullWidth,
    })}
  >
    {children}
    {iconLeft && React.cloneElement(iconLeft, { className: 'is-small is-left' })}
    {isError && <Error className="is-small is-right" icon={ICONS.faExclamationTriangle} />}
    {!isError && iconRight && React.cloneElement(iconRight, { className: 'is-small is-right' })}
  </ControlContainer>
)

export class Field extends React.PureComponent<IFieldProps> {
  static Container = FieldContainer
  static Label = FieldLabel
  static Control = FieldControl

  render() {
    const { label } = this.props
    return (
      <FieldContainer>
        {label && <FieldLabel>{label}</FieldLabel>}
        <FieldControl {...this.props} />
      </FieldContainer>
    )
  }
}
