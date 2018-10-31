import * as React from 'react'
import Flatpickr from 'flatpickr'
import { Instance } from 'flatpickr/dist/types/instance'
import 'flatpickr/dist/themes/dark.css'
interface Props {
  onChange?: (date: Date) => void
  defaultHour?: number
  minuteIncrement?: number
}

export class Timepicker extends React.Component<Props> {
  flatpickr: Instance
  node: HTMLInputElement | null

  componentDidMount() {
    // bugfix for flatpickr never emits the default date
    let firstEmit = false
    const emit = (d: Date) => {
      firstEmit = true
      const { onChange } = this.props
      onChange && onChange(d)
    }

    const { defaultHour = 12, minuteIncrement = 30 } = this.props
    this.flatpickr = Flatpickr(this.node as HTMLInputElement, {
      enableTime: true,
      noCalendar: true,
      onChange: date => emit(date[0]),
      onClose: (_, __, opts) => !firstEmit && emit(opts.selectedDates[0]),
      time_24hr: true,
      defaultHour,
      minuteIncrement,
    }) as Instance
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    return <input className="input" ref={node => (this.node = node)} />
  }
}
