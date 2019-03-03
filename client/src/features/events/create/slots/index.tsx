import * as React from 'react'
import { Button, Grid, Icon, ICONS, Text } from '../../../../ui'
import { Group, ParsedGroups, Sides } from '../../../../util/sqmTypes'
import { Side } from './Side'

interface Props {
  initalGroups: ParsedGroups
  onReset: () => void
  onGroupUpdate: (group: Group) => void
  onRemoveGroup: (group: Group) => void
}

export default class Slots extends React.PureComponent<Props> {
  render() {
    const { initalGroups, onGroupUpdate } = this.props
    return (
      <React.Fragment>
        <Grid.Column>
          <Button isRounded isPulledRight onClick={console.log}>
            <Icon icon={ICONS.faRedo} />
            <Text>Start over</Text>
          </Button>
        </Grid.Column>
        <Side side={Sides.BLUFOR} groups={initalGroups.blufor} onGroupUpdate={onGroupUpdate} />
      </React.Fragment>
    )
  }
}
