import React from 'react'
import { Group as TypeGroup, Sides } from '../../../../util/sqmTypes'
import { Group } from './Group'
import styled from 'styled-components'
import { Section, Title, Grid, Button, Icon, ICONS, Text } from '../../../../ui'
import { Colors } from '../../../../util/Colors'
import * as R from 'ramda'

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
const getGroupCount = (groups: TypeGroup[], side: Sides) => R.pathOr(0, ['length'], groups)

interface Props {
  groups: TypeGroup[]
  side: Sides
}

export class Side extends React.PureComponent<Props> {
  static defaultProps: Partial<Props> = { groups: [] }

  render() {
    const { groups, side } = this.props

    return (
      <SideContainer>
        <BorderBottomTitle style={{ color: Colors.Sides[side] }}>
          {side.toUpperCase()} ({getGroupCount(groups, side)})
        </BorderBottomTitle>
        <Grid.Container isMultiline>
          {groups.map((group, index) => (
            <Group key={group.id} group={group} side={side} />
          ))}
        </Grid.Container>
        <Grid.Column sizeDesktop={3} sizeTablet={6}>
          <Button isFullwidth onClick={console.log}>
            <Icon icon={ICONS.faUserFriends} />
            <Text>Add group</Text>
          </Button>
        </Grid.Column>
      </SideContainer>
    )
  }
}
