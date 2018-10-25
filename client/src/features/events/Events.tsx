import * as React from 'react'
import { Icon, ICONS, Input, Radio, RadioGroup, Title } from '../../ui'
import { Field, Form } from '../../ui/Form'
import { Grid } from '../../ui/Grid'

export default class Events extends React.Component {
  onSubmit = () => {}

  render = () => (
    <React.Fragment>
      <Title>Create event</Title>
      <Form onSubmit={this.onSubmit}>
        <Grid.Container isMultiline>
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
          <Grid.Column>
            <RadioGroup name="type" defaultValue="co">
              <Radio label="COOP" value="co" isInline />
              <Radio label="TVT" value="tvt" isInline />
            </RadioGroup>
          </Grid.Column>
        </Grid.Container>
      </Form>
    </React.Fragment>
  )
}
