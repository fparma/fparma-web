import * as React from 'react'
import { Container, ICONS, Tab, Tabs, Title } from '../../../ui'
import { Group, ParsedGroups } from '../../../util/sqmTypes'
import EventInformation from './EventInformation'
import SelectSlotInput from './SelectSlotInput'
import Slots from './slots'

export class EventCreate extends React.PureComponent {
  state = { step: 1, groups: data }

  setStep = (step: number) => () => {
    this.setState({ step })
  }

  isStepActive = (step: number) => {
    return this.state.step === step
  }

  onReset = () => this.setState({ groups: null })

  onInputSelection = (groups: ParsedGroups) => this.setState({ groups })

  onGroupUpdate = (group: Group) => {
    const { id } = group
    const { groups: stateGroups } = this.state
    const sideGroups = stateGroups[group.side]

    const newGroups = sideGroups.find(grp => grp.id === id)
      ? sideGroups.map(grp => (grp.id === id ? group : grp))
      : [...sideGroups, group]

    this.setState({ groups: { ...sideGroups, [group.side]: newGroups } })
  }

  onRemoveGroup = (group: Group) => {
    const { id } = group
    const { groups } = this.state
    const newGroups = groups[group.side].filter(grp => grp.id !== id)
    this.setState({ groups: { ...groups, [group.side]: newGroups } })
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
            <SelectSlotInput onSlotInput={this.onInputSelection} />
          </Container>
          <Container hidden={Boolean(!this.state.groups)}>
            <Slots
              initalGroups={(this.state.groups as unknown) as ParsedGroups}
              onReset={this.onReset}
              onGroupUpdate={this.onGroupUpdate}
              onRemoveGroup={this.onRemoveGroup}
            />
          </Container>
        </Container>
      </React.Fragment>
    )
  }
}

var data = {
  blufor: [
    {
      id: 417,
      side: 'blufor',
      units: [
        {
          id: 418,
          type: 'B_Soldier_SL_F',
          side: 'blufor',
          attrs: { rank: 'CAPTAIN', description: 'Squad Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
        {
          id: 419,
          type: 'B_medic_F',
          side: 'blufor',
          attrs: { description: 'Medic', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male07ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.03 },
          ],
        },
        {
          id: 427,
          type: 'B_soldier_LAT_F',
          side: 'blufor',
          attrs: { description: 'Rifleman (AT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
        {
          id: 428,
          type: 'B_soldier_LAT_F',
          side: 'blufor',
          attrs: { description: 'Rifleman (AT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.94999999 },
          ],
        },
        {
          id: 429,
          type: 'B_Soldier_TL_F',
          side: 'blufor',
          attrs: { rank: 'SERGEANT', description: 'Team Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male09ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 430,
          type: 'B_soldier_AR_F',
          side: 'blufor',
          attrs: { description: 'Autorifleman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 431,
          type: 'B_soldier_AAR_F',
          side: 'blufor',
          attrs: { description: 'Ammo Bearer', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.05 },
          ],
        },
        {
          id: 1357,
          type: 'B_soldier_AR_F',
          side: 'blufor',
          attrs: { description: 'Autorifleman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male06ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.98000002 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Alpha' }],
      name: 'Alpha',
    },
    {
      id: 433,
      side: 'blufor',
      units: [
        {
          id: 434,
          type: 'B_Soldier_SL_F',
          side: 'blufor',
          attrs: { rank: 'CAPTAIN', description: 'Squad Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
        {
          id: 435,
          type: 'B_medic_F',
          side: 'blufor',
          attrs: { description: 'Medic', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male07ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.03 },
          ],
        },
        {
          id: 436,
          type: 'B_soldier_LAT_F',
          side: 'blufor',
          attrs: { description: 'Rifleman (AT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
        {
          id: 437,
          type: 'B_soldier_LAT_F',
          side: 'blufor',
          attrs: { description: 'Rifleman (AT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.94999999 },
          ],
        },
        {
          id: 438,
          type: 'B_Soldier_TL_F',
          side: 'blufor',
          attrs: { rank: 'SERGEANT', description: 'Team Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male09ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 439,
          type: 'B_soldier_AR_F',
          side: 'blufor',
          attrs: { description: 'Autorifleman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 440,
          type: 'B_soldier_AAR_F',
          side: 'blufor',
          attrs: { description: 'Ammo Bearer', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.05 },
          ],
        },
        {
          id: 1358,
          type: 'B_soldier_AR_F',
          side: 'blufor',
          attrs: { description: 'Autorifleman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male06ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.98000002 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Bravo' }],
      name: 'Bravo',
    },
    {
      id: 442,
      side: 'blufor',
      units: [
        {
          id: 443,
          type: 'B_Soldier_SL_F',
          side: 'blufor',
          attrs: { rank: 'CAPTAIN', description: 'Squad Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
        {
          id: 444,
          type: 'B_medic_F',
          side: 'blufor',
          attrs: { description: 'Medic', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male07ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.03 },
          ],
        },
        {
          id: 445,
          type: 'B_soldier_LAT_F',
          side: 'blufor',
          attrs: { description: 'Rifleman (AT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
        {
          id: 446,
          type: 'B_soldier_LAT_F',
          side: 'blufor',
          attrs: { description: 'Rifleman (AT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.94999999 },
          ],
        },
        {
          id: 447,
          type: 'B_Soldier_TL_F',
          side: 'blufor',
          attrs: { rank: 'SERGEANT', description: 'Team Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male09ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 448,
          type: 'B_soldier_AR_F',
          side: 'blufor',
          attrs: { description: 'Autorifleman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 449,
          type: 'B_soldier_AAR_F',
          side: 'blufor',
          attrs: { description: 'Ammo Bearer', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.05 },
          ],
        },
        {
          id: 1359,
          type: 'B_soldier_AR_F',
          side: 'blufor',
          attrs: { description: 'Autorifleman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male06ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.98000002 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Charlie' }],
      name: 'Charlie',
    },
    {
      id: 451,
      side: 'blufor',
      units: [
        {
          id: 452,
          type: 'B_Soldier_SL_F',
          side: 'blufor',
          attrs: { rank: 'CAPTAIN', description: 'Squad Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male09ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
        {
          id: 453,
          type: 'B_medic_F',
          side: 'blufor',
          attrs: { description: 'Medic', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male04ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.97000003 },
          ],
        },
        {
          id: 454,
          type: 'B_HeavyGunner_F',
          side: 'blufor',
          attrs: { description: 'Machine Gunner', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male02ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.97000003 },
          ],
        },
        {
          id: 455,
          type: 'B_support_AMG_F',
          side: 'blufor',
          attrs: { description: 'Asst. Machine Gunner', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.99000001 },
          ],
        },
        {
          id: 456,
          type: 'B_Soldier_TL_F',
          side: 'blufor',
          attrs: { rank: 'SERGEANT', description: 'Team Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male01ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.94999999 },
          ],
        },
        {
          id: 458,
          type: 'B_soldier_AT_F',
          side: 'blufor',
          attrs: { description: 'Missile Specialist (HAT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male04ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.98000002 },
          ],
        },
        {
          id: 459,
          type: 'B_soldier_AAT_F',
          side: 'blufor',
          attrs: { description: 'Asst. Missile Specialist (HAT)', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.94999999 },
          ],
        },
        {
          id: 1348,
          type: 'B_soldier_M_F',
          side: 'blufor',
          attrs: { description: 'Marksman', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male08ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.95999998 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Delta' }],
      name: 'Delta',
    },
    {
      id: 406,
      side: 'blufor',
      units: [
        {
          id: 407,
          type: 'B_RangeMaster_F',
          side: 'blufor',
          attrs: {
            rank: 'COLONEL',
            init: 'call{[this, "Curator"] call bis_fnc_setUnitInsignia;}',
            name: 'gm0',
            description: 'Game master',
            isPlayer: 1,
          },
          customAttrs: [{ property: 'pitch', expression: '_this setpitch _value;', value: 0.99000001 }],
        },
        {
          id: 410,
          type: 'B_RangeMaster_F',
          side: 'blufor',
          attrs: {
            rank: 'MAJOR',
            init: 'call{[this, "Curator"] call bis_fnc_setUnitInsignia;}',
            name: 'gm1',
            description: 'Game master',
            isPlayable: 1,
          },
          customAttrs: [{ property: 'pitch', expression: '_this setpitch _value;', value: 0.99000001 }],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Game master' }],
      name: 'Game master',
    },
    {
      id: 497,
      side: 'blufor',
      units: [
        {
          id: 498,
          type: 'B_crew_F',
          side: 'blufor',
          attrs: { rank: 'SERGEANT', name: 'vc1', description: 'Commander', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
        {
          id: 499,
          type: 'B_crew_F',
          side: 'blufor',
          attrs: { description: 'Gunner', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.95999998 },
          ],
        },
        {
          id: 500,
          type: 'B_crew_F',
          side: 'blufor',
          attrs: { description: 'Driver', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male11ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Hotel 1' }],
      name: 'Hotel 1',
    },
    {
      id: 488,
      side: 'blufor',
      units: [
        {
          id: 489,
          type: 'B_engineer_F',
          side: 'blufor',
          attrs: { description: 'Engineer', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male03ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
        {
          id: 490,
          type: 'B_soldier_exp_F',
          side: 'blufor',
          attrs: { description: 'Expl Spec.', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male09ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
        {
          id: 491,
          type: 'B_soldier_exp_F',
          side: 'blufor',
          attrs: { description: 'Expl. Spec', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male06ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.03 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Kilo' }],
      name: 'Kilo',
    },
    {
      id: 502,
      side: 'blufor',
      units: [
        {
          id: 503,
          type: 'B_Helipilot_F',
          side: 'blufor',
          attrs: { description: 'Pilot', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male11ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.03 },
          ],
        },
        {
          id: 504,
          type: 'B_helicrew_F',
          side: 'blufor',
          attrs: { description: 'Crew', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male09ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.04 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Lima 1' }],
      name: 'Lima 1',
    },
    {
      id: 412,
      side: 'blufor',
      units: [
        {
          id: 413,
          type: 'B_officer_F',
          side: 'blufor',
          attrs: { rank: 'COLONEL', name: 'plt', description: 'Platoon Leader', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.98000002 },
          ],
        },
        {
          id: 414,
          type: 'B_officer_F',
          side: 'blufor',
          attrs: { rank: 'MAJOR', description: '2IC', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male06ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.99000001 },
          ],
        },
        {
          id: 415,
          type: 'B_medic_F',
          side: 'blufor',
          attrs: { rank: 'CORPORAL', description: 'Medic', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male06ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
        {
          id: 416,
          type: 'B_soldier_UAV_F',
          side: 'blufor',
          attrs: { rank: 'CORPORAL', description: 'UAV Operator', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male02ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1 },
          ],
        },
      ],
      attrs: [
        { property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Platoon Command' },
      ],
      name: 'Platoon Command',
    },
    {
      id: 492,
      side: 'blufor',
      units: [
        {
          id: 493,
          type: 'B_crew_F',
          side: 'blufor',
          attrs: { rank: 'SERGEANT', name: 'sc1', description: 'Commander', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
        {
          id: 494,
          type: 'B_crew_F',
          side: 'blufor',
          attrs: { description: 'Gunner', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male10ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 0.95999998 },
          ],
        },
        {
          id: 495,
          type: 'B_crew_F',
          side: 'blufor',
          attrs: { description: 'Driver', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male11ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.02 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Sierra 1' }],
      name: 'Sierra 1',
    },
    {
      id: 506,
      side: 'blufor',
      units: [
        {
          id: 507,
          type: 'B_Fighter_Pilot_F',
          side: 'blufor',
          attrs: { description: 'Pilot', isPlayable: 1 },
          customAttrs: [
            { property: 'speaker', expression: '_this setspeaker _value;', value: 'Male05ENG' },
            { property: 'pitch', expression: '_this setpitch _value;', value: 1.03 },
          ],
        },
      ],
      attrs: [{ property: 'groupID', expression: '[_this, _value] call CBA_fnc_setCallsign', value: 'Whiskey 1' }],
      name: 'Whiskey 1',
    },
  ],
  opfor: [],
  indepedent: [],
  civilian: [],
}
