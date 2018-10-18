import * as React from 'react'
import { Icon, ICONS } from './Icon'
import { printClass } from './utils'
import styled from 'styled-components'

interface IInputProps {
  className?: string
}

export const Input: React.SFC<IInputProps> = ({ className }) => {
  return <input type="text" className={printClass('input', className)} />
}

interface ICheckboxProps extends IInputProps {
  checked?: boolean | undefined
  label?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Styled = styled.div`
  label {
    display: inline-flex;
  }
  label:hover {
    cursor:pointer;
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

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target)return
    
    const {checked} = e.target
    this.setState(prevState => ({checked}))
    if (this.props.onChange) this.props.onChange(e)
  }

  static size = {fontSize: '1.4rem'}

  render() {
    const { className, label } = this.props
    return (
      <Styled className="field" >
        <label>
          <input
            type="checkbox"
            onChange={e => this.onChange(e)}
            className={printClass('is-checkbox', className)}
          />
          {this.state.checked && <Icon icon={ICONS.faCheckSquare} style={Checkbox.size} />}
          {!this.state.checked && <Icon icon={ICONS.faSquare} style={Checkbox.size} />}

          <span>{label}</span>
        </label>
      </Styled>
    )
  }
}
