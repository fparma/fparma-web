import React from 'react'
import { Group as TypeGroup, Sides } from '../../../../util/sqmTypes'
import { Grid, Field, Icon, ICONS, Input, Tile } from '../../../../ui'
import styled from 'styled-components'
import { Unit } from './Unit'

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
const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
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

const StretchedTile = styled(Tile)`
  height: 100%;
`

interface Props {
  group: TypeGroup
  side: Sides
}

export class Group extends React.PureComponent<Props> {
  render() {
    const { group } = this.props
    return (
      <React.Fragment>
        <Grid.Column key={group.id} sizeDesktop={3} sizeTablet={6}>
          <StretchedTile isBox isVertical hasShadow>
            <Field.Container>
              <RowContainer>
                <Field.Label>Group name</Field.Label>
                <IconContainer>
                  <Clickable onClick={console.log}>
                    <Icon icon={ICONS.faArrowsAlt} />
                  </Clickable>
                  <Clickable onClick={console.log}>
                    <Icon icon={ICONS.faCloseX} />
                  </Clickable>
                </IconContainer>
              </RowContainer>
              <Field.Control isFullWidth>
                <Input
                  name={``}
                  placeholder="E.g Alpha"
                  value={group.name}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                />
                {/* {Boolean(nameError) && <Text isWarning>{nameError}</Text>} */}
              </Field.Control>
            </Field.Container>
            <Container>
              <Field.Label>Units (0)</Field.Label>
              <UnitButtonContainer>
                <Clickable onClick={console.log}>
                  <Icon icon={ICONS.faUserPlus} />
                </Clickable>
                <Clickable onClick={console.log}>
                  <Icon icon={ICONS.faUserMinus} />
                </Clickable>
              </UnitButtonContainer>
            </Container>
            {Array.isArray(group.units) && group.units.map((unit, index) => <Unit key={unit.id} unit={unit} />)}
          </StretchedTile>
        </Grid.Column>
      </React.Fragment>
    )
  }
}
