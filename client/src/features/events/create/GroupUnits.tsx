import React from 'react'
import styled from 'styled-components'
import { Field, Icon, ICONS, Input } from '../../../ui'
import { Unit } from '../../../util/sqmTypes'

interface Props {
  units: Unit[]
  formikKey: string
  handleChange: any
  handleBlur: any
}

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

export class GroupUnits extends React.PureComponent<Props> {
  render() {
    const { units, formikKey, handleBlur, handleChange } = this.props
    return (
      <React.Fragment>
        <Container>
          <Field.Label>Units ({units.length})</Field.Label>
          <UnitButtonContainer>
            <Clickable onClick={console.log}>
              <Icon icon={ICONS.faUserPlus} />
            </Clickable>
            <Clickable onClick={console.log}>
              <Icon icon={ICONS.faUserMinus} />
            </Clickable>
          </UnitButtonContainer>
        </Container>
        {units.map((unit, index) => (
          <UnitField key={unit.id}>
            <Input
              name={`${formikKey}.units[${index}].attrs.description`}
              placeholder="E.g SQL, Asst AR, Rifleman"
              value={unit.attrs.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </UnitField>
        ))}
      </React.Fragment>
    )
  }
}
