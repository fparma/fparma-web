import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { Icon, ICONS } from '../Icon'
import { InputElement } from './index'

const { Consumer, Provider } = React.createContext({
  value: '',
  name: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
})

interface IRadioGroupProps {
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => {}
  defaultValue?: string
}

class RadioGroup extends React.PureComponent<IRadioGroupProps, { value: string }> {
  constructor(props: IRadioGroupProps) {
    super(props)
    this.state = { value: props.defaultValue || '' }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    console.log(value)

    this.setState({ value })
    if (this.props.onChange) this.props.onChange(e)
  }

  render() {
    const { name, children } = this.props
    const { value } = this.state
    return <Provider value={{ name, value, onChange: e => this.onChange(e) }}>{children}</Provider>
  }
}

interface IRadioProps extends InputElement {
  className?: string
  isInline?: boolean
  value: string
  label: string
}

const radioContainer: StyledFunction<Partial<IRadioProps>> = styled.div

const StyledRadio = radioContainer`
  display: ${({ isInline }) => (isInline ? 'inline-flex' : 'flex')};
  padding-right: ${({ isInline }) => (isInline ? '12px' : 0)};
  color: ${({ disabled }) => (disabled ? 'grey' : 'inherit')};

  input {
    position: absolute;
    opacity: 0;
  }

  input:focus + span {
    outline: 1px grey dotted;
  }

  label {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};;
  }

  .icon + span {
    padding-left: 6px;
  }
`

class Radio extends React.PureComponent<IRadioProps> {
  render() {
    const { className, value, label, ...rest } = this.props
    return (
      <Consumer>
        {ctx => (
          <StyledRadio className={className} isInline={rest.isInline} disabled={rest.disabled}>
            <label>
              <input type="radio" name={ctx.name} value={value} onChange={e => ctx.onChange(e)} {...rest} />
              <Icon icon={ctx.value === value ? ICONS.faCheckCircle : ICONS.faCircle} />
              <span>{label}</span>
            </label>
          </StyledRadio>
        )}
      </Consumer>
    )
  }
}

export { RadioGroup, Radio }
