import * as React from 'react'
import { Icon, ICONS, Title } from '../../ui'
import { Field, Form } from '../../ui/Form'
import { Grid } from '../../ui/Grid'

export default class Events extends React.Component {
  onSubmit = () => {}

  render = () => (
    <React.Fragment>
      <Title>Create event</Title>
      <Form onSubmit={this.onSubmit}>
        <Grid.Container>
          <Grid.Column size={6}>
            <Field name="test" label="Event title" iconLeft={<Icon icon={ICONS.faImages} />}>
              <input className="input" type="text" />
            </Field>
          </Grid.Column>
        </Grid.Container>
      </Form>
    </React.Fragment>
  )
}
