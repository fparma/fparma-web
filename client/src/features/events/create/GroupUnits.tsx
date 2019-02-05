import { ArrayHelpers, FieldArray } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { Field, Icon, ICONS, Input } from '../../../ui'
import { generateId } from '../../../util/generateId'
import { Sides, Unit } from '../../../util/sqmTypes'

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
  addUnit = (helpers: ArrayHelpers) => () => {
    helpers.push({
      id: generateId(),
      side: Sides.BLUFOR,
      attrs: { description: '' },
      type: '',
    } as Unit)
  }

  removeUnit = (helpers: ArrayHelpers) => () => {
    helpers.pop()
  }

  renderHeader = (helpers: ArrayHelpers) => (
    <Container>
      <Field.Label>Units ({this.props.units.length})</Field.Label>
      <UnitButtonContainer>
        <Clickable onClick={this.addUnit(helpers)}>
          <Icon icon={ICONS.faUserPlus} />
        </Clickable>
        <Clickable onClick={this.removeUnit(helpers)}>
          <Icon icon={ICONS.faUserMinus} />
        </Clickable>
      </UnitButtonContainer>
    </Container>
  )

  renderUnits = (helpers: ArrayHelpers) => (unit: Unit, index: number) => {
    const { units, formikKey, handleBlur, handleChange } = this.props
    return (
      <UnitField key={unit.id}>
        <Input
          name={`${formikKey}[${index}].attrs.description`}
          placeholder="E.g SQL, Asst AR, Rifleman"
          value={unit.attrs.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </UnitField>
    )
  }

  render() {
    const { units, formikKey } = this.props
    return (
      <FieldArray
        name={formikKey}
        render={helpers => (
          <React.Fragment>
            {this.renderHeader(helpers)}
            {units.map(this.renderUnits(helpers))}
          </React.Fragment>
        )}
      />
    )
  }
}
