import * as React from 'react'
import { Icon, ICONS, Input, Radio, RadioGroup, TextArea, Title } from '../../ui'
import { Field, Form } from '../../ui/Form'
import { Grid } from '../../ui/Grid'
import { Datepicker } from '../../ui/Timepicker/DatePicker'
import { Timepicker } from '../../ui/Timepicker/Timepicker'

const DEFAULT_HOUR_UTC = 18

export default class Events extends React.Component {
  state = {
    form: {},
  }
  onSubmit = () => {}

  handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const change = { [name]: value }
    this.setState((prevState: any) => ({ form: { ...prevState.form, ...change } }))
  }

  render = () => (
    <React.Fragment>
      <Title>Schedule a new event</Title>
      <pre>{JSON.stringify(this.state.form)}</pre>
      <Form onSubmit={this.onSubmit}>
        <Grid.Container>
          <Grid.Column sizeFullhd={5} sizeDesktop={6}>
            <Grid.Container isMultiline isMobile>
              <Grid.Column>
                <RadioGroup name="type" defaultValue="co" label="Event type" onChange={this.handleFormChange}>
                  <Radio label="COOP" value="co" isInline />
                  <Radio label="TVT" value="tvt" isInline />
                </RadioGroup>
              </Grid.Column>

              <Grid.Column isFull>
                <Field label="Event title">
                  <Input name="title" placeholder="Operation FPARMA" onChange={this.handleFormChange} />
                </Field>
              </Grid.Column>

              <Grid.Column sizeDesktop={6} sizeTablet={8} sizeMobile={8}>
                <Field label="Date">
                  <Datepicker />
                </Field>
              </Grid.Column>

              <Grid.Column sizeDesktop={6} sizeTablet={4} sizeMobile={4}>
                <Field label="Time">
                  <Timepicker defaultHour={DEFAULT_HOUR_UTC} />
                </Field>
              </Grid.Column>

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
              <TextArea name="description" placeholder="If custom mods are used, remember to link them here" />
            </Field>
          </Grid.Column>
        </Grid.Container>
      </Form>
    </React.Fragment>
  )
}
