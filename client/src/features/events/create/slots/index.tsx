import React from 'react'
import { ParsedGroups } from '../../../../util/sqmTypes'
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

  render() {
    const { values } = this.state
    return <Side side={values.blufor} />
  }
}
