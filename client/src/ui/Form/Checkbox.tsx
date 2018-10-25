import * as React from 'react'
import styled from 'styled-components'
import { Icon, ICONS } from '../Icon'
import { classnames } from '../utils'
import { InputElement } from './index'

interface ICheckboxProps extends InputElement {
  type?: never
  isInline?: boolean
  label: string
  className?: string
  name?: string
  checked?: boolean | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Styled: any = styled.div`
  display: ${(props: ICheckboxProps) => (props.isInline ? 'inline-flex' : 'flex')}
  padding-right: ${(props: ICheckboxProps) => (props.isInline ? '12px' : 0)};
  label {
    display: inline-flex;
  }
  label:hover {
    cursor: pointer;
  }
  input {
    position: absolute;
    opacity: 0;
  }
  input + span {
    margin-right: 6px;
  }
  input:focus + span {
    border: 1px solid #3273dc;
  }
  input + span:last-child {
    text-decoration: underline;
  }
`

export class Checkbox extends React.PureComponent<ICheckboxProps, { checked: boolean | undefined }> {
  constructor(props: ICheckboxProps) {
    super(props)
    this.state = {
      checked: props.checked,
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return

    const { checked } = e.target
    this.setState({ checked })
    if (this.props.onChange) this.props.onChange(e)
  }

  static size = { fontSize: '1.4rem' }

  render() {
    const { className, isInline, onChange, label, type, ...rest } = this.props
    return (
      <Styled className={classnames('field')} isInline>
        <label>
          <input type="checkbox" onChange={this.onChange} className={classnames('is-checkbox', className)} {...rest} />
          <Icon icon={this.state.checked ? ICONS.faCheckSquare : ICONS.faSquare} style={Checkbox.size} />
          <span>{label}</span>
        </label>
      </Styled>
    )
  }
}
