import React from 'react'
import { Button, Grid, Icon, ICONS, Text } from '../../../../ui'
import { ParsedGroups, Sides } from '../../../../util/sqmTypes'
import { Side } from './Side'

interface Props {
  data: ParsedGroups
}

interface State {
  values: ParsedGroups
  errors: ParsedGroups
}

export class SlotsManager extends React.PureComponent<Props, State> {
  componentWillMount() {
    const { data } = this.props
    this.setState({ values: { ...data } })
  }

  handleChange = e => {
    console.log(e)
  }

  render() {
    const { values } = this.state
    return (
      <React.Fragment>
        <Grid.Column>
          <Button isRounded isPulledRight onClick={console.log}>
            <Icon icon={ICONS.faRedo} />
            <Text>Reset</Text>
          </Button>
        </Grid.Column>
        <Side groups={values.blufor} side={Sides.BLUFOR} handleChange={this.handleChange} />
        <Side groups={values.opfor} side={Sides.OPFOR} />
        <Side groups={values.independent} side={Sides.INDEPENDENT} />
        <Side groups={values.civilian} side={Sides.CIVILIAN} />
      </React.Fragment>
    )
  }
}
