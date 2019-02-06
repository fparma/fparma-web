import React from 'react'
import { Unit as TypeUnit } from '../../../../util/sqmTypes'

interface Props {
  unit: TypeUnit
}

export class Unit extends React.PureComponent<Props> {
  render() {
    const { unit } = this.props
    return <h1>{unit.id}</h1>
  }
}
