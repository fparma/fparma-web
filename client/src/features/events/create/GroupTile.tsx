import React from 'react'
import styled from 'styled-components'
import { Field, Grid, Icon, ICONS, Input, Tile } from '../../../ui'
import { Group } from '../../../util/sqmTypes'
import { GroupUnits } from './GroupUnits'

const Container = styled.div`
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

interface Props {
  group: Group
  formikKey: string
  handleChange: any
  handleBlur: any
}

export class GroupTile extends React.PureComponent<Props> {
  render() {
    const { group, formikKey, handleBlur, handleChange } = this.props
    return (
      <Grid.Column sizeDesktop={3} sizeTablet={6}>
        <Tile isBox isVertical hasShadow>
          <Field.Container>
            <Container>
              <Field.Label>Group name</Field.Label>
              <IconContainer>
                <Clickable onClick={console.log}>
                  <Icon icon={ICONS.faArrowsAlt} />
                </Clickable>
                <Clickable onClick={console.log}>
                  <Icon icon={ICONS.faCloseX} />
                </Clickable>
              </IconContainer>
            </Container>
            <Field.Control isFullWidth>
              <Input
                name={`${formikKey}.name`}
                placeholder="E.g Alpha"
                value={group.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field.Control>
          </Field.Container>
          <GroupUnits units={group.units} formikKey={formikKey} handleChange={handleChange} handleBlur={handleBlur} />
        </Tile>
      </Grid.Column>
    )
  }
}
