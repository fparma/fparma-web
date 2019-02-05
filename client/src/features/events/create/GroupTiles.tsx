import { ArrayHelpers, FieldArray } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { Button, Field, Grid, Icon, ICONS, Input, Text, Tile } from '../../../ui'
import { generateId } from '../../../util/generateId'
import { Group, Sides } from '../../../util/sqmTypes'
import { GroupUnits } from './GroupUnits'

const RowContainer = styled.div`
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

const StretchedTile = styled(Tile)`
  height: 100%;
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

  createGroup = (helpers: ArrayHelpers) => () => {
    helpers.push({
      id: generateId(),
      side: Sides[this.props.formikKey],
      name: '',
      units: [],
    } as Group)
  }

  renderGroup = (helpers: ArrayHelpers) => (group: Group, index: number) => {
    const { formikKey, handleBlur, handleChange } = this.props
    const groupKey = `${formikKey}[${index}]`
    return (
      <Grid.Column key={group.id} sizeDesktop={3} sizeTablet={6}>
        <StretchedTile isBox isVertical hasShadow>
          <Field.Container>
            <RowContainer>
              <Field.Label>Group name</Field.Label>
              <IconContainer>
                <Clickable onClick={console.log}>
                  <Icon icon={ICONS.faArrowsAlt} />
                </Clickable>
                <Clickable onClick={() => helpers.remove(index)}>
                  <Icon icon={ICONS.faCloseX} />
                </Clickable>
              </IconContainer>
            </RowContainer>
            <Field.Control isFullWidth>
              <Input
                name={`${groupKey}.name`}
                placeholder="E.g Alpha"
                value={group.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field.Control>
          </Field.Container>
          <GroupUnits
            units={group.units}
            formikKey={`${groupKey}.units`}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </StretchedTile>
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
              <Button isFullwidth onClick={this.createGroup(helpers)}>
                <Icon icon={ICONS.faUserFriends} />
                <Text>Add group</Text>
              </Button>
            </Grid.Column>
          </React.Fragment>
        )}
      />
    )
  }
}
