import * as React from 'react'
import { Icon, ICONS, Input, Radio, RadioGroup, TextArea, Title } from '../../ui'
import { Field } from '../../ui/Form'
import { Grid } from '../../ui/Grid'
import { Datepicker } from '../../ui/Timepicker/DatePicker'
import { Timepicker } from '../../ui/Timepicker/Timepicker'
import styled from 'styled-components'

const pad = (nr: number) => (nr < 10 ? `0${nr}` : `${nr}`)

const getDefaultHour = () => {
  const d = new Date()
  d.setUTCHours(19)
  return d.getHours()
}

const GridColumnSmall = styled(Grid.Column)`
  padding-top: 0 !important;
`

export default class Events extends React.PureComponent {
  state = { date: null, time: null }
  minDate = new Date()

  get maxDate() {
    const date = new Date()
    date.setMonth(date.getMonth() + 2)
    return date
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { target: form } = e
    const data = new FormData(form as HTMLFormElement)
    data.forEach((val, key) => {
      console.log(key, '=', val)
    })
  }

  getMergedDate() {
    const { date, time } = this.state
    if (!date || !time) return null
    const d = new Date((date as Date).getTime())
    d.setHours((time as Date).getHours(), (time as Date).getMinutes(), 0, 0)
    return d
  }

  onDateChange = (d: Date) => {
    this.setState({ date: new Date(d.getTime()) })
  }

  onTimeChange = (d: Date) => {
    this.setState({ time: new Date(d.getTime()) })
  }

  render = () => {
    const date = this.getMergedDate()
    return (
      <React.Fragment>
        <Title>Schedule a new event</Title>
        <form onSubmit={this.onSubmit}>
          <button type="submit">Submit</button>
          <Grid.Container>
            <Grid.Column sizeFullhd={5} sizeDesktop={6}>
              <Grid.Container isMultiline isMobile>
                <Grid.Column>
                  <RadioGroup name="type" defaultValue="co" label="Event type">
                    <Radio label="COOP" value="co" required />
                    <Radio label="TVT" value="tvt" />
                  </RadioGroup>
                </Grid.Column>

                <Grid.Column isFull>
                  <Field label="Event title">
                    <Input name="title" placeholder="Operation FPARMA" />
                  </Field>
                </Grid.Column>

                <Grid.Column sizeDesktop={6} sizeTablet={8} sizeMobile={8}>
                  <Field label="Date">
                    <Datepicker minDate={this.minDate} maxDate={this.maxDate} onChange={this.onDateChange} />
                  </Field>
                </Grid.Column>

                <Grid.Column sizeDesktop={6} sizeTablet={4} sizeMobile={4}>
                  <Field label="Time">
                    <Timepicker onChange={this.onTimeChange} defaultHour={getDefaultHour()} />
                  </Field>
                </Grid.Column>

                <GridColumnSmall isNarrow isFull>
                  <span>{date && `Entered time in UTC: ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`}</span>
                </GridColumnSmall>

                <Grid.Column isFull>
                  <Field label="Author(s)" iconLeft={<Icon icon={ICONS.faUserTie} />}>
                    <Input name="authors" placeholder="User, Other User" />
                  </Field>
                </Grid.Column>

                <Grid.Column isFull>
                  <Field label="Image url (optional)" iconLeft={<Icon icon={ICONS.faImages} />}>
                    <Input name="image" placeholder="http://example.com/image.jpg" />
                  </Field>
                </Grid.Column>
              </Grid.Container>
            </Grid.Column>
          </Grid.Container>

          <Grid.Container>
            <Grid.Column isFull>
              <Field label="Event description">
                <TextArea
                  name="description"
                  rows={15}
                  placeholder="If custom mods are used, remember to link them here"
                />
              </Field>
            </Grid.Column>
          </Grid.Container>
        </form>
      </React.Fragment>
    )
  }
}
