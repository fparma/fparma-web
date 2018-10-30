import * as React from 'react'
import Flatpickr from 'flatpickr'
import { Instance } from 'flatpickr/dist/types/instance'
import 'flatpickr/dist/themes/dark.css'
import { Dropdown } from '../Dropdown'
import { Button } from '../Button'
interface Props {
  defaultHour?: number
  minuteIncrediment?: number
  onChange?: (date: string) => void
}

export class Timepicker extends React.Component<Props> {
  render() {
    return (
      <Dropdown.Root isHoverable>
        <Dropdown.Trigger>
          <Button>Test</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>
            <span>Value!</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Root>
    )
  }
}
