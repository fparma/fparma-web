import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { Button, Buttons, Grid, Icon, ICONS, Section, Text, Tile, Title } from '../../../../ui'
import { Colors } from '../../../../util/Colors'
import { Group as TypeGroup, Sides } from '../../../../util/sqmTypes'
import EditGroup from './EditGroup'

const StretchedTile = styled(Tile)`
  height: 100%;
`

const SideContainer = styled(Section)`
  && {
    padding-left: 0;
    padding-right: 0;
    padding-top: 1.5rem;
  }
`

const BorderBottomTitle = styled(Title)`
  && {
    border-bottom: 1px solid;
  }
`

const GroupTitle = styled(Title)`
  &&& {
    margin: 0;
    flex: 1;
    overflow-wrap: anywhere;
  }
`

const TextIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`

const lengthOf = R.pipe(
  R.length,
  R.defaultTo(0)
)

const countAllSlots = groups => groups.reduce((acc, group) => acc + lengthOf(group.units), 0)

interface Props {
  groups: TypeGroup[]
  side: Sides
}

interface State {
  groupBeingEdited: TypeGroup | null
}

export class Side extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = { groups: [] }
  state = { groupBeingEdited: null }

  renderGroup = (group: TypeGroup) => (
    <Grid.Column key={group.id} sizeDesktop={3} sizeTablet={6}>
      <StretchedTile isBox isVertical hasShadow>
        <TextIconContainer>
          <GroupTitle size={5}>{group.name}</GroupTitle>
          <Buttons>
            <Button isSmall onClick={this.editGroup(group)}>
              <Icon icon={ICONS.faPencilAlt} />
            </Button>
            <Button isSmall isStatic>
              <Icon icon={ICONS.faArrowsAlt} />
            </Button>
          </Buttons>
        </TextIconContainer>
        {group.units.map((unit, index) => (
          <Text key={unit.id} isParagraph>
            {index + 1}. {unit.attrs.description}
          </Text>
        ))}
      </StretchedTile>
    </Grid.Column>
  )

  editGroup = group => () => this.setState({ groupBeingEdited: { ...group } })
  clearEditGroup = () => this.setState({ groupBeingEdited: null })

  render() {
    const { groups, side } = this.props
    const { groupBeingEdited } = this.state

    return (
      <React.Fragment>
        {groupBeingEdited && (
          <EditGroup group={this.state.groupBeingEdited} onSubmit={() => {}} onCancel={this.clearEditGroup} />
        )}
        <SideContainer>
          <BorderBottomTitle style={{ color: Colors.Sides[side] }}>
            {side.toUpperCase()} ({lengthOf(groups)} groups, {countAllSlots(groups)} slots)
          </BorderBottomTitle>
          <Grid.Container isMultiline>
            {groups.map(this.renderGroup)}
            <Grid.Column sizeDesktop={3} sizeTablet={6}>
              <Button isFullwidth onClick={console.log}>
                <Icon icon={ICONS.faUserFriends} />
                <Text>Add group</Text>
              </Button>
            </Grid.Column>
          </Grid.Container>
        </SideContainer>
      </React.Fragment>
    )
  }
}
