import React from 'react'
import { Group as TypeGroup } from '../../../../util/sqmTypes'
import { Unit } from './Unit'

interface Props {
  group: TypeGroup
}

export class Group extends React.PureComponent<Props> {
  render() {
    const { group } = this.props
    return group.units.map((unit, index) => <Unit unit={unit} />)
  }
}
