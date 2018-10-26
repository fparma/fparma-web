import * as React from 'react'
import { Icon, ICONS, Input, Radio, RadioGroup, TextArea, Title } from '../../ui'
import { Field, Form } from '../../ui/Form'
import { Grid } from '../../ui/Grid'

export default class Events extends React.Component {
  onSubmit = () => {}

  render = () => (
    <React.Fragment>
      <Title>Schedule a new event</Title>
      <Form onSubmit={this.onSubmit}>
        <Grid.Container>
          <Grid.Column sizeFullhd={5} sizeDesktop={6}>
            <Grid.Container isMultiline>
              <Grid.Column>
                <RadioGroup name="type" defaultValue="co" label="Event type">
                  <Radio label="COOP" value="co" isInline />
                  <Radio label="TVT" value="tvt" isInline />
                </RadioGroup>
              </Grid.Column>

              <Grid.Column isFull>
                <Field name="title" label="Event title">
                  <Input placeholder="Operation FPARMA" />
                </Field>
              </Grid.Column>

              <Grid.Column isFull>
                <Field name="author" label="Author(s)" iconLeft={<Icon icon={ICONS.faUserTie} />}>
                  <Input placeholder="User, Other User" />
                </Field>
              </Grid.Column>

              <Grid.Column isFull>
                <Field name="image" label="Image url (optional)" iconLeft={<Icon icon={ICONS.faImages} />}>
                  <Input placeholder="http://example.com/image.jpg" />
                </Field>
              </Grid.Column>
            </Grid.Container>
          </Grid.Column>
        </Grid.Container>

        <Grid.Container>
          <Grid.Column isFull>
            <Field name="author" label="Event description">
              <TextArea placeholder="If custom mods are used, remember to link them here" />
            </Field>
          </Grid.Column>
        </Grid.Container>
      </Form>
    </React.Fragment>
  )
}
