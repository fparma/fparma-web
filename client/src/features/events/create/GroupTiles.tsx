import { ArrayHelpers, FieldArray } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { Button, Field, Grid, Icon, ICONS, Input, Text, Tile } from '../../../ui'
import { Group, Sides } from '../../../util/sqmTypes'
import { GroupUnits } from './GroupUnits'
import { createGroup } from './utils'

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
  side: Sides
  formikKey: string
  handleChange: any
  handleBlur: any
  hasError: (key: string, field: string) => undefined | string
}

yup
  .string()
  .required('Required')
  .min(2, 'Too short!')
  .max(48, 'Too long!')

export class GroupTiles extends React.PureComponent<Props> {
  static defaultProps = {
    groups: [],
  }

  createGroup = (helpers: ArrayHelpers) => () => {
    helpers.push(createGroup(this.props.side, 2))
  }

  renderGroup = (helpers: ArrayHelpers) => (group: Group, index: number) => {
    const { side, formikKey, handleBlur, handleChange, hasError } = this.props
    const groupKey = `${formikKey}[${index}]`
    const nameError = hasError(groupKey, 'name')

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
            <Field.Control isFullWidth isError={Boolean(nameError)}>
              <Input
                name={`${groupKey}.name`}
                placeholder="E.g Alpha"
                value={group.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {Boolean(nameError) && <Text isWarning>{nameError}</Text>}
            </Field.Control>
          </Field.Container>
          <GroupUnits
            units={group.units}
            side={side}
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
