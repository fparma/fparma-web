import * as React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { Icon, ICONS } from '../Icon'

const { Consumer, Provider } = React.createContext({
  value: '',
  name: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
})

interface IRadioGroupProps {
  name: string
  label?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}

const RadioContainer = styled.div`
  > div:not(:last-child) {
    margin-right: 0.5em;
  }
`

class RadioGroup extends React.PureComponent<IRadioGroupProps, { value: string }> {
  constructor(props: IRadioGroupProps) {
    super(props)
    this.state = { value: props.defaultValue || '' }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    this.setState({ value })
    if (this.props.onChange) this.props.onChange(e)
  }

  render() {
    const { label, name, children } = this.props
    const { value } = this.state
    return (
      <RadioContainer className="control">
        <Provider value={{ name, value, onChange: e => this.onChange(e) }}>
          {label && <label className="label">{label}</label>}
          {children}
        </Provider>
      </RadioContainer>
    )
  }
}

interface IRadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string
  value: string
  label: string
}

const radio: StyledFunction<Partial<IRadioProps>> = styled.div

const StyledRadio = radio`
  display: inline-flex;
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

  label:hover .icon {
    color: white;
  }

  .icon + span {
    vertical-align: text-bottom;
  }
`

const StyledLabel = styled.label`
  && {
    display: flex;
    align-items: center;
  }
`

class Radio extends React.PureComponent<IRadioProps> {
  render() {
    const { className, value, label, ...rest } = this.props
    return (
      <Consumer>
        {ctx => (
          <StyledRadio className={className} disabled={rest.disabled}>
            <StyledLabel className="radio">
              <input
                type="radio"
                name={ctx.name}
                value={value}
                defaultChecked={ctx.value === value}
                onChange={e => ctx.onChange(e)}
                {...rest}
              />
              <Icon icon={ctx.value === value ? ICONS.faCheckCircle : ICONS.faCircle} />
              <span>{label}</span>
            </StyledLabel>
          </StyledRadio>
        )}
      </Consumer>
    )
  }
}

export { RadioGroup, Radio }
