import * as React from 'react'
import { Icon, ICONS } from './Icon'
import { printClass } from './utils'

interface IInputProps {
  className?: string
}

export const Input: React.SFC<IInputProps> = ({ className }) => {
  return <input type="text" className={printClass('input', className)} />
}

interface ICheckboxProps extends IInputProps {
  checked?: boolean | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export class Checkbox extends React.PureComponent<ICheckboxProps, { checked: boolean | undefined }> {
  inpRef: React.RefObject<HTMLInputElement>

  constructor(props: ICheckboxProps) {
    super(props)
    this.state = {
      checked: props.checked,
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState(prevState => {
      checked: !prevState.checked
    })
    if (this.props.onChange) this.props.onChange(e)
  }

  render() {
    const { className } = this.props
    return (
      <div className="field">
        <label>
          <input
            ref={this.inpRef}
            type="checkbox"
            onChange={e => this.onChange(e)}
            className={printClass('is-checkbox', className)}
          />
          {this.state.checked && <Icon icon={ICONS.faCheckSquare} />}
          {!this.state.checked && <Icon icon={ICONS.faSquareFull} />}

          <span>Test</span>
        </label>
      </div>
    )
  }
}
