import React from 'react'
import styled from 'styled-components'
import { Field, Grid, Icon, ICONS, Input, Tile, Button, Text } from '../../../ui'
import { Group, Sides } from '../../../util/sqmTypes'
import { GroupUnits } from './GroupUnits'
import { FieldArray, ArrayHelpers } from 'formik'
import { generateId } from '../../../util/generateId'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
`

const Clickable = styled.a`
  color: white;
  &&:not(:last-child) {
    margin-right: 12px;
  }

  span {
    justify-content: flex-start;
  }
`

interface Props {
  groups: Group[]
  formikKey: string
  handleChange: any
  handleBlur: any
}

export class GroupTiles extends React.PureComponent<Props> {
  static defaultProps = {
    groups: [],
  }

  createGroup = add => () => {
    add({
      id: generateId(),
      side: Sides[this.props.formikKey],
      name: '',
      units: [],
      attrs: [],
    } as Group)
  }

  renderGroup = (helpers: ArrayHelpers) => (group: Group, index: number) => {
    const { formikKey, handleBlur, handleChange } = this.props
    return (
      <Grid.Column key={group.id} sizeDesktop={3} sizeTablet={6}>
        <Tile isBox isVertical hasShadow>
          <Field.Container>
            <Container>
              <Field.Label>Group name</Field.Label>
              <IconContainer>
                <Clickable onClick={console.log}>
                  <Icon icon={ICONS.faArrowsAlt} />
                </Clickable>
                <Clickable onClick={() => helpers.remove(index)}>
                  <Icon icon={ICONS.faCloseX} />
                </Clickable>
              </IconContainer>
            </Container>
            <Field.Control isFullWidth>
              <Input
                name={`${formikKey}[${index}].name`}
                placeholder="E.g Alpha"
                value={group.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field.Control>
          </Field.Container>
          <GroupUnits units={group.units} formikKey={formikKey} handleChange={handleChange} handleBlur={handleBlur} />
        </Tile>
      </Grid.Column>
    )
  }

  render() {
    const { groups, formikKey } = this.props
    return (
      <FieldArray
        name={formikKey}
        render={helpers => (
          <React.Fragment>
            {groups.map(this.renderGroup(helpers))}
            <Grid.Column sizeDesktop={3} sizeTablet={6}>
              <Button isFullwidth isRounded isMedium onClick={this.createGroup(helpers.push)}>
                <Icon icon={ICONS.faPlusSquare} />
                <Text>Add group</Text>
              </Button>
            </Grid.Column>
          </React.Fragment>
        )}
      />
    )
  }
}
