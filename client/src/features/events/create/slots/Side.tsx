import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { Button, Grid, Icon, ICONS, Section, Text, Title } from '../../../../ui'
import { Colors } from '../../../../util/Colors'
import { Group as TypeGroup, Sides } from '../../../../util/sqmTypes'
import { Group } from './Group'

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
const countGroup = R.pipe(
  R.length,
  R.defaultTo(0)
)

interface Props {
  groups: TypeGroup[]
  side: Sides
  handleChange: any
}

export class Side extends React.PureComponent<Props> {
  static defaultProps: Partial<Props> = { groups: [] }

  renderGroup = group => (
    <Group key={group.id} group={group} side={this.props.side} handleChange={this.props.handleChange} />
  )

  render() {
    const { groups, side } = this.props

    return (
      <SideContainer>
        <BorderBottomTitle style={{ color: Colors.Sides[side] }}>
          {side.toUpperCase()} ({countGroup(groups)})
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
    )
  }
}
