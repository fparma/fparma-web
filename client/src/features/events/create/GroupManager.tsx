import * as React from 'react'
import styled from 'styled-components'
import { Section, Field, Grid, Icon, ICONS, Input, Tile, Title } from '../../../ui'
import { Group, Unit, ParsedGroups, Sides } from '../../../util/sqmTypes'
import { propOr, isEmpty } from 'ramda'

interface Props {
  data: ParsedGroups
}

const SideColors = {
  blufor: '#2185D0',
  opfor: '#921818',
  greenfor: '#21BA45',
  civilian: '#A333C8',
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
`
const UnitButtonContainer = styled.div`
  display: flex;
  margin-left: auto;

  button {
    padding-left: 1em;
    padding-right: 1em;
  }
  button:not(:last-child) {
    margin-right: 0.5em;
  }
`

const UnitField = styled.div`
  &&:not(:last-child) {
    padding-bottom: 0.5em;
  }
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

const UnitHeader = ({ length }) => (
  <Container>
    <Field.Label>Units ({length})</Field.Label>
    <UnitButtonContainer>
      <Clickable onClick={console.log}>
        <Icon icon={ICONS.faUserPlus} />
      </Clickable>
      <Clickable onClick={console.log}>
        <Icon icon={ICONS.faUserMinus} />
      </Clickable>
    </UnitButtonContainer>
  </Container>
)

const GroupHeader = ({ color }) => (
  <Container>
    <Field.Label>Group name</Field.Label>
    <IconContainer>
      <Clickable onClick={console.log}>
        <Icon icon={ICONS.faArrowsAlt} />
      </Clickable>
      <Clickable onClick={console.log}>
        <Icon icon={ICONS.faCloseX} />
      </Clickable>
    </IconContainer>
  </Container>
)

const renderUnit = (unit: Unit) => (
  <UnitField>
    <Input name="name" placeholder="E.g SQL, Asst AR, Rifleman" />
  </UnitField>
)

const renderGroup = (group: Group) => (
  <Grid.Column sizeDesktop={3} sizeTablet={6}>
    <Tile isBox isVertical>
      <Field.Container>
        <GroupHeader color={SideColors[group.side]} />
        <Field.Control isFullWidth>
          <Input name="title" placeholder="E.g Alpha" />
        </Field.Control>
      </Field.Container>
      <UnitHeader length={group.units.length} />
      {group.units.map(renderUnit)}
    </Tile>
  </Grid.Column>
)

const ORDER = [Sides.BLUFOR, Sides.OPFOR, Sides.INDEPENDENT, Sides.INDEPENDENT]
export default class GroupManager extends React.PureComponent<Props> {
  render() {
    const { data } = this.props
    if (!data) return null

    return ORDER.map(side => {
      return isEmpty(propOr([], side, data)) ? null : (
        <Section>
          <Title>{side.toUpperCase()}</Title>
          <Grid.Container isMultiline>{data[side].map(renderGroup)}</Grid.Container>
        </Section>
      )
    })
  }
}
