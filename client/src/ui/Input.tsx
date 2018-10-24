import * as React from 'react'
import { Icon, ICONS } from './Icon'
import { printClass } from './utils'
import styled from 'styled-components'

interface IInputProps {
  className?: string
  name?: string
}

export const Input: React.SFC<IInputProps> = ({ name, className }) => {
  return <input type="text" name={name} className={printClass('input', className)} />
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
    if (!e.target) return

    const { checked } = e.target
    this.setState(prevState => ({ checked }))
    if (this.props.onChange) this.props.onChange(e)
  }

  static size = { fontSize: '1.4rem' }

  render() {
    const { className, label, name } = this.props
    return (
      <Styled className="field" >
        <label>
          <input
            type="checkbox"
            name={name}
            onChange={e => this.onChange(e)}
            className={printClass('is-checkbox', className)}
          />
          <Icon icon={this.state.checked ? ICONS.faCheckSquare : ICONS.faSquare} style={Checkbox.size} />
          <span>{label}</span>
        </label>
      </Styled>
    )
  }
}

const StyledRadio = styled.div`
  input {
    position: absolute;
    opacity: 0;
  }

  label {
    display: flex;
  }

  .icon {
    padding-right: 6px;
  }
`

const { Consumer, Provider } = React.createContext({
  value: '',
  onChange: null
})

export class RadioGroup extends React.PureComponent<{ value: string }, { value: string }> {
  constructor(props: { value: string }) {
    super(props)
    this.state = { value: props.value }
  }


  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state
    return <Provider value={{ value, onChange: this.onChange.bind(this) }}>{this.props.children}</Provider>
  }
}

interface IRadioProps extends ICheckboxProps {
  value: string
}

export class Radio extends React.PureComponent<IRadioProps, { checked: boolean | undefined }> {


  constructor(props: IRadioProps) {
    super(props)
    this.state = {
      checked: props.checked,
    }
  }

  render() {
    const { className, name, value } = this.props
    return <Consumer>
      {provider =>
        <StyledRadio className={className}>
          <label>
            <input type="radio" name={name} value={value} onChange={e => provider.onChange(e)} />
            <Icon icon={value === provider.value ? ICONS.faCheckCircle : ICONS.faCircle} />
            <span>Text</span>
          </label>
        </StyledRadio>
      }
    </Consumer>
  }
}
