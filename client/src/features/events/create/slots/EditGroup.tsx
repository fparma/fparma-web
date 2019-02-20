import * as React from 'react'
import { Buttons, Button, Grid, Icon, ICONS, Text, Title, Modal, Field, Input, TextArea } from '../../../../ui'
import { Group, Unit } from '../../../../util/sqmTypes'
import styled from 'styled-components'

const CenteredButtons = styled(Buttons)`
  margin: auto;
`

interface Props {
  group: Group | null
  onSubmit: (group: Group) => void
  onCancel: () => void
}

export default class EditGroup extends React.PureComponent<Props> {
  renderBody = (group: Group) => (
    <Grid.Container>
      <Grid.Column>
        <Field label="Group name">
          <Input name="name" placeholder="Name" value={group.name} />
        </Field>
        <Field label="Group description (optional)">
          <TextArea name="description" rows={5} placeholder="Special remarks, attachments" />
        </Field>
      </Grid.Column>
      <Grid.Column>
        <Field.Label>Slots</Field.Label>
        {group.units.map(this.renderSlot)}
      </Grid.Column>
    </Grid.Container>
  )

  renderSlot = (unit: Unit, index: number) => (
    <Field.Container>
      <Text isParagraph className="control has-icons-left has-icons-right">
        <Input isSmall placeholder="Slot description" value={unit.attrs.description} />
        <Text className="icon is-small is-left">{index + 1}.</Text>
      </Text>
    </Field.Container>
  )

  render() {
    const { group, onSubmit, onCancel } = this.props
    if (!group) return null

    return (
      <Modal isActive={true}>
        <Modal.Background />
        <Modal.Card>
          <Modal.CardHead>
            <Title>Edit group</Title>
          </Modal.CardHead>
          <Modal.CardBody>{this.renderBody(group)}</Modal.CardBody>
          <Modal.CardFooter>
            <CenteredButtons>
              <Button onClick={onCancel}>
                <Icon icon={ICONS.faCloseX} />
                <Text>Cancel</Text>
              </Button>
              <Button>
                <Icon icon={ICONS.faCheckCircle} />
                <Text>Done</Text>
              </Button>
            </CenteredButtons>
          </Modal.CardFooter>
        </Modal.Card>
        <Modal.Close onClick={onCancel} />
      </Modal>
    )
  }
}
