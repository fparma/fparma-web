import * as React from 'react'
import { Container, ICONS, Tab, Tabs, Title } from '../../../ui'
import EventInformation from './EventInformation'
import SelectSlotInput from './SelectSlotInput'
import { Groups } from '../../../util/sqmTypes'
import GroupManager from './GroupManager'

export class EventCreate extends React.PureComponent {
  state = { step: 1, groups: null }

  setStep = (step: number) => () => {
    this.setState({ step })
  }

  isStepActive = (step: number) => {
    return this.state.step === step
  }

  componentDidMount() {
    this.setState({ groups: data })
  }

  render() {
    return (
      <React.Fragment>
        <Title>Schedule a new event</Title>

        <Tabs isBoxed isFullWidth>
          <Tab icon={ICONS.faPencilAlt} isActive={this.isStepActive(0)} onClick={this.setStep(0)} text="Information" />
          <Tab icon={ICONS.faUserCog} isActive={this.isStepActive(1)} onClick={this.setStep(1)} text="Slots" />
          <Tab icon={ICONS.faSearch} isActive={this.isStepActive(2)} onClick={this.setStep(2)} text="Review" />
        </Tabs>

        <Container hidden={!this.isStepActive(0)}>
          <EventInformation />
        </Container>

        <Container hidden={!this.isStepActive(1)}>
          <Container hidden={Boolean(this.state.groups)}>
            <SelectSlotInput onGroups={console.log} />
          </Container>
          <Container hidden={Boolean(!this.state.groups)}>
            <GroupManager groups={(this.state.groups as unknown) as Groups[]} />
          </Container>
        </Container>
      </React.Fragment>
    )
  }
}
