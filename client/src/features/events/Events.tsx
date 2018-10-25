import * as React from 'react'
import { Icon, ICONS, Title } from '../../ui'
import { Field, Form } from '../../ui/Form'
import { Grid } from '../../ui/Grid'
import { Input, Checkbox, Radio, RadioGroup } from '../../ui/Input'

export default class Events extends React.Component {
  onSubmit = () => {}

  render = () => (
    <React.Fragment>
      <Title>Create event</Title>
      <Form onSubmit={this.onSubmit}>
        <Grid.Container>
          <Grid.Column size={6}>
            <Field name="title" label="Event title">
              <Input />
            </Field>
          </Grid.Column>
          <Grid.Column size={6}>
            <Field name="author" label="Authors" iconLeft={<Icon icon={ICONS.faUserTie} />}>
              <Input />
            </Field>
          </Grid.Column>
        </Grid.Container>
        <Grid.Container />
      </Form>
    </React.Fragment>
  )
}
