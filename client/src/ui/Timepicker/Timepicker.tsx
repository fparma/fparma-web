import * as React from 'react'
import Flatpickr from 'flatpickr'
import { Instance } from 'flatpickr/dist/types/instance'
import 'flatpickr/dist/themes/dark.css'
interface Props {
  defaultHour?: number
  minuteIncrediment?: number
}

export class Timepicker extends React.Component<Props> {
  flatpickr: Instance
  node: HTMLInputElement | null

  componentDidMount() {
    const { defaultHour = 12, minuteIncrediment = 30 } = this.props
    this.flatpickr = Flatpickr(this.node as HTMLInputElement, {
      enableTime: true,
      noCalendar: true,
      time_24hr: true,
      defaultHour: defaultHour,
      minuteIncrement: minuteIncrediment,
    }) as Instance
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    return <input className="input" ref={node => (this.node = node)} />
  }
}
