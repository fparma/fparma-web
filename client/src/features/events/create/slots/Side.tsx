import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { Button, Grid, Icon, ICONS, Section, Text, Tile, Title } from '../../../../ui'
import { Colors } from '../../../../util/Colors'
import { Group as TypeGroup, Sides } from '../../../../util/sqmTypes'
import EditGroup from './EditGroup'

const StretchedTile = styled(Tile)`
  && {
    position: relative;
    height: 100%;
  }

  &&:hover .cover {
    opacity: 1;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .cover {
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.2s;
  }
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
    overflow-wrap: anywhere;
  }
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
      <StretchedTile isBox isVertical hasShadow onClick={this.editGroup(group)}>
        <GroupTitle>{group.name}</GroupTitle>
        {group.units.map((unit, index) => (
          <Text key={unit.id} isParagraph size={5}>
            {index + 1}. {unit.attrs.description}
          </Text>
        ))}
        <div className="cover">
          <Icon icon={ICONS.faPencilAlt} size="4x" />
        </div>
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
