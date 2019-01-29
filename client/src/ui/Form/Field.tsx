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

const FlexedDiv = styled.div`
  flex: 1;
`

const Error = styled(Icon)`
  color: rgba(255, 30, 15, 0.8);
`

const FieldContainer: React.SFC = ({ children }) => <FlexedDiv className="field">{children}</FlexedDiv>
const FieldLabel: React.SFC = ({ children }) => <label className="label">{children}</label>
const FieldControl: React.SFC<IFieldProps> = ({ isError, iconLeft, iconRight, isFullWidth, children }) => (
  <div
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
  </div>
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
