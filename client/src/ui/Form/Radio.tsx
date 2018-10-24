import * as React from 'react'
import styled from 'styled-components'
import { ICONS, Icon } from '../Icon';

const { Consumer, Provider } = React.createContext({
  value: '',
  name: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => { }
})

interface IRadioGroupProps {
  value: string,
  name: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => {}
}

class RadioGroup extends React.PureComponent<IRadioGroupProps, { value: string }> {
  constructor(props: IRadioGroupProps) {
    super(props)
    this.state = { value: props.value }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    this.setState(() => { value })
    if (this.props.onChange) this.props.onChange(e)
  }

  render() {
    const { name, children } = this.props
    const { value } = this.state
    return <Provider value={{ name, value, onChange: e => this.onChange(e) }}>{children}</Provider>
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

interface IRadioProps {
  className?: string
  value: string
  text: string
}

class Radio extends React.PureComponent<IRadioProps> {

  render() {
    const { className, value, text } = this.props
    return <Consumer>
      {ctx =>
        <StyledRadio className={className}>
          <label>
            <input type="radio" name={ctx.name} value={value} onChange={e => ctx.onChange(e)} />
            <Icon icon={value === ctx.value ? ICONS.faCheckCircle : ICONS.faCircle} />
            <span>{text}</span>
          </label>
        </StyledRadio>
      }
    </Consumer>
  }
}

export { RadioGroup, Radio }
