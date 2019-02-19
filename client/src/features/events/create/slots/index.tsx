import * as React from 'react'
import { ParsedGroups, Sides } from '../../../../util/sqmTypes'
import { Grid, Button, Text, Icon, ICONS } from '../../../../ui'
import { Side } from './Side'

interface Props {
  initalGroups: ParsedGroups
  onReset: () => void
}

export default class Slots extends React.PureComponent<Props> {
  render() {
    const { initalGroups } = this.props
    return (
      <React.Fragment>
        <Grid.Column>
          <Button isRounded isPulledRight onClick={console.log}>
            <Icon icon={ICONS.faRedo} />
            <Text>Start over</Text>
          </Button>
        </Grid.Column>
        <Side groups={initalGroups.blufor} side={Sides.BLUFOR} />
      </React.Fragment>
    )
  }
}
