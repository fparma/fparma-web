import * as React from 'react'
import styled from 'styled-components'
import { Button, Field, Grid, Icon, ICONS, Input, Tile } from '../../../ui'
import { Group, Unit } from '../../../util/sqmTypes'

interface Props {
  groups: Group[]
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

const UnitHeader = ({ length }) => (
  <Container>
    <Field.Label>Units ({length})</Field.Label>
    <UnitButtonContainer>
      <Button isSmall>
        <Icon icon={ICONS.faUserPlus} />
      </Button>
      <Button isSmall>
        <Icon icon={ICONS.faUserMinus} />
      </Button>
    </UnitButtonContainer>
  </Container>
)

const GroupHeader = ({ color }) => (
  <Container>
    <Field.Label>
      <span style={{ backgroundColor: color }}>Group name</span>
    </Field.Label>
    <IconContainer>
      <Icon icon={ICONS.faArrowsAlt} />
      <Icon icon={ICONS.faCloseX} />
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

export default class GroupManager extends React.PureComponent<Props> {
  render() {
    const { groups } = this.props
    return <Grid.Container isMultiline>{groups.map(renderGroup)}</Grid.Container>
  }
}
