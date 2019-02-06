import React from 'react'
import { Group as TypeGroup } from '../../../../util/sqmTypes'
import { Group } from './Group'

interface Props {
  side: TypeGroup[]
}

export class Side extends React.PureComponent<Props> {
  render() {
    const { side } = this.props
    return side.map((group, index) => <Group key={group.id} group={group} />)
  }
}
