import * as React from 'react'
import Flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/dark.css'

export class Datepicker extends React.Component {
  node: HTMLInputElement | null
  flatpickr: any
  componentDidMount() {
    this.flatpickr = Flatpickr(this.node as HTMLInputElement, {
      dateFormat: 'l, j M Y',
      weekNumbers: true,
      locale: { firstDayOfWeek: '1' } as any,
    })
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  render() {
    return <input className="input" ref={node => (this.node = node)} />
  }
}
