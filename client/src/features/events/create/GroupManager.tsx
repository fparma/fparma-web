import * as React from 'react'
import { Groups } from '../../../util/sqmTypes'
import { Title } from '../../../ui/Title'

interface Props {
  groups: Groups[]
}

export default class GroupManager extends React.PureComponent<Props> {
  render() {
    return <Title>Test</Title>
  }
}
