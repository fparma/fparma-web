import * as React from 'react'
import Flatpickr from 'flatpickr'

import 'flatpickr/dist/themes/dark.css'

interface Props {
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

export class Datepicker extends React.Component<Props> {
  node: HTMLInputElement | null
  flatpickr: any
  componentDidMount() {
    this.flatpickr = Flatpickr(this.node as HTMLInputElement, {
      dateFormat: 'l, j M Y',
      weekNumbers: true,
      onChange: date => this.props.onChange && this.props.onChange(date[0]),
      locale: { firstDayOfWeek: '1' } as any,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
    })
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    return <input className="input" ref={node => (this.node = node)} />
  }
}
