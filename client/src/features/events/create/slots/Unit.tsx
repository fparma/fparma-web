import React from 'react'
import { Unit as TypeUnit } from '../../../../util/sqmTypes'
import styled from 'styled-components'
import { Field, Icon, ICONS, Input } from '../../../../ui'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const UnitButtonContainer = styled.div`
  display: flex;
  margin-left: auto;

  button {
    padding-left: 1em;
    padding-right: 1em;
  }
  button:not(:last-child) {
    margin-right: 0.5em;
  }
`
const Clickable = styled.a`
  color: white;
  &&:not(:last-child) {
    margin-right: 12px;
  }

  span {
    justify-content: flex-start;
  }
`

const UnitField = styled.div`
  &&:not(:last-child) {
    padding-bottom: 0.5em;
  }
`

interface Props {
  unit: TypeUnit
}

export class Unit extends React.PureComponent<Props> {
  render() {
    const { unit } = this.props
    return (
      <UnitField key={unit.id}>
        <Input
          name={``}
          placeholder="E.g SQL, Asst AR, Rifleman"
          value={unit.attrs.description}
          // onChange={handleChange}
          // onBlur={handleBlur}
        />
      </UnitField>
    )
  }
}
