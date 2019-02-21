import { Formik } from 'formik'
import * as React from 'react'
import styled from 'styled-components'
import { Button, Buttons, Field, Grid, Icon, ICONS, Input, Modal, Text, TextArea, Title } from '../../../../ui'
import { Group } from '../../../../util/sqmTypes'

const CenteredButtons = styled(Buttons)`
  margin: auto;
`

const InputContainer = styled.div`
  flex-direction: row;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  .control {
    flex: 1;
  }
`

interface Props {
  group: Group | null
  onSubmit: (group: Group) => void
  onCancel: () => void
}

interface State {
  group: Group
}

export default class EditGroup extends React.PureComponent<Props, State> {
  renderForm = (values: Group, handleChange, handleBlur) => (
    <Grid.Container>
      <Grid.Column>
        <Field label="Group name">
          <Input name="name" placeholder="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
        </Field>
        <Field label="Group description (optional)">
          <TextArea name="description" rows={5} placeholder="Special remarks, attachments" />
        </Field>
      </Grid.Column>
      <Grid.Column>
        <Field.Label>Slots ({values.units.length})</Field.Label>
        {values.units.map((unit, index) => (
          <Field.Container key={unit.id} hasAddons>
            <Field.Control isFullWidth>
              <Input
                isSmall
                name={`units.${index}.attrs.description`}
                placeholder="Slot description"
                value={unit.attrs.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field.Control>
            <Button isSmall>
              <Icon isError icon={ICONS.faCloseX} />
            </Button>
          </Field.Container>
        ))}
        <Button isSmall isFullwidth>
          <Icon icon={ICONS.faUserPlus} />
          <Text>Add slot</Text>
        </Button>
      </Grid.Column>
    </Grid.Container>
  )

  render() {
    const { group, onSubmit, onCancel } = this.props
    if (!group) return null

    return (
      <Formik initialValues={group} onSubmit={() => {}} validateOnBlur={true}>
        {({
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
        }) => (
          <Modal isActive={true}>
            <Modal.Background />
            <Modal.Card>
              <Modal.CardHead>
                <Title>Edit group</Title>
              </Modal.CardHead>
              <Modal.CardBody>{this.renderForm(values, handleChange, handleBlur)}</Modal.CardBody>
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
        )}
      </Formik>
    )
  }
}
