import * as React from 'react'
import { Container, ICONS, Tab, Tabs, Title } from '../../../ui'
import { Group } from '../../../util/sqmTypes'
import EventInformation from './EventInformation'
import GroupManager from './GroupManager'
import SelectSlotInput from './SelectSlotInput'

export class EventCreate extends React.PureComponent {
  state = { step: 1, groups: data }

  setStep = (step: number) => () => {
    this.setState({ step })
  }

  isStepActive = (step: number) => {
    return this.state.step === step
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
            <GroupManager groups={(this.state.groups as unknown) as Group[]} />
          </Container>
        </Container>
      </React.Fragment>
    )
  }
}

var data = [
  {
    sqmId: 417,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 418,
        type: 'B_Soldier_SL_F',
        side: 'blufor',
        attrs: {
          rank: 'CAPTAIN',
          description: 'Squad Leader@Alpha',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
      {
        sqmId: 419,
        type: 'B_medic_F',
        side: 'blufor',
        attrs: {
          description: 'Medic',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male07ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.03,
          },
        ],
      },
      {
        sqmId: 427,
        type: 'B_soldier_LAT_F',
        side: 'blufor',
        attrs: {
          description: 'Rifleman (AT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
      {
        sqmId: 428,
        type: 'B_soldier_LAT_F',
        side: 'blufor',
        attrs: {
          description: 'Rifleman (AT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.94999999,
          },
        ],
      },
      {
        sqmId: 429,
        type: 'B_Soldier_TL_F',
        side: 'blufor',
        attrs: {
          rank: 'SERGEANT',
          description: 'Team Leader',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male09ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 430,
        type: 'B_soldier_AR_F',
        side: 'blufor',
        attrs: {
          description: 'Autorifleman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 431,
        type: 'B_soldier_AAR_F',
        side: 'blufor',
        attrs: {
          description: 'Ammo Bearer',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.05,
          },
        ],
      },
      {
        sqmId: 1357,
        type: 'B_soldier_AR_F',
        side: 'blufor',
        attrs: {
          description: 'Autorifleman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male06ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.98000002,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Alpha',
      },
    ],
  },
  {
    sqmId: 433,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 434,
        type: 'B_Soldier_SL_F',
        side: 'blufor',
        attrs: {
          rank: 'CAPTAIN',
          description: 'Squad Leader@Bravo',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
      {
        sqmId: 435,
        type: 'B_medic_F',
        side: 'blufor',
        attrs: {
          description: 'Medic',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male07ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.03,
          },
        ],
      },
      {
        sqmId: 436,
        type: 'B_soldier_LAT_F',
        side: 'blufor',
        attrs: {
          description: 'Rifleman (AT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
      {
        sqmId: 437,
        type: 'B_soldier_LAT_F',
        side: 'blufor',
        attrs: {
          description: 'Rifleman (AT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.94999999,
          },
        ],
      },
      {
        sqmId: 438,
        type: 'B_Soldier_TL_F',
        side: 'blufor',
        attrs: {
          rank: 'SERGEANT',
          description: 'Team Leader',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male09ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 439,
        type: 'B_soldier_AR_F',
        side: 'blufor',
        attrs: {
          description: 'Autorifleman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 440,
        type: 'B_soldier_AAR_F',
        side: 'blufor',
        attrs: {
          description: 'Ammo Bearer',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.05,
          },
        ],
      },
      {
        sqmId: 1358,
        type: 'B_soldier_AR_F',
        side: 'blufor',
        attrs: {
          description: 'Autorifleman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male06ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.98000002,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Bravo',
      },
    ],
  },
  {
    sqmId: 442,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 443,
        type: 'B_Soldier_SL_F',
        side: 'blufor',
        attrs: {
          rank: 'CAPTAIN',
          description: 'Squad Leader@Charlie',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
      {
        sqmId: 444,
        type: 'B_medic_F',
        side: 'blufor',
        attrs: {
          description: 'Medic',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male07ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.03,
          },
        ],
      },
      {
        sqmId: 445,
        type: 'B_soldier_LAT_F',
        side: 'blufor',
        attrs: {
          description: 'Rifleman (AT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
      {
        sqmId: 446,
        type: 'B_soldier_LAT_F',
        side: 'blufor',
        attrs: {
          description: 'Rifleman (AT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.94999999,
          },
        ],
      },
      {
        sqmId: 447,
        type: 'B_Soldier_TL_F',
        side: 'blufor',
        attrs: {
          rank: 'SERGEANT',
          description: 'Team Leader',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male09ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 448,
        type: 'B_soldier_AR_F',
        side: 'blufor',
        attrs: {
          description: 'Autorifleman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 449,
        type: 'B_soldier_AAR_F',
        side: 'blufor',
        attrs: {
          description: 'Ammo Bearer',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.05,
          },
        ],
      },
      {
        sqmId: 1359,
        type: 'B_soldier_AR_F',
        side: 'blufor',
        attrs: {
          description: 'Autorifleman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male06ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.98000002,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Charlie',
      },
    ],
  },
  {
    sqmId: 451,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 452,
        type: 'B_Soldier_SL_F',
        side: 'blufor',
        attrs: {
          rank: 'CAPTAIN',
          description: 'Squad Leader@Delta',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male09ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
      {
        sqmId: 453,
        type: 'B_medic_F',
        side: 'blufor',
        attrs: {
          description: 'Medic',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male04ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.97000003,
          },
        ],
      },
      {
        sqmId: 454,
        type: 'B_HeavyGunner_F',
        side: 'blufor',
        attrs: {
          description: 'Machine Gunner',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male02ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.97000003,
          },
        ],
      },
      {
        sqmId: 455,
        type: 'B_support_AMG_F',
        side: 'blufor',
        attrs: {
          description: 'Asst. Machine Gunner',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.99000001,
          },
        ],
      },
      {
        sqmId: 456,
        type: 'B_Soldier_TL_F',
        side: 'blufor',
        attrs: {
          rank: 'SERGEANT',
          description: 'Team Leader',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male01ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.94999999,
          },
        ],
      },
      {
        sqmId: 458,
        type: 'B_soldier_AT_F',
        side: 'blufor',
        attrs: {
          description: 'Missile Specialist (HAT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male04ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.98000002,
          },
        ],
      },
      {
        sqmId: 459,
        type: 'B_soldier_AAT_F',
        side: 'blufor',
        attrs: {
          description: 'Asst. Missile Specialist (HAT)',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.94999999,
          },
        ],
      },
      {
        sqmId: 1348,
        type: 'B_soldier_M_F',
        side: 'blufor',
        attrs: {
          description: 'Marksman',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male08ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.95999998,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Delta',
      },
    ],
  },
  {
    sqmId: 406,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 407,
        type: 'B_RangeMaster_F',
        side: 'blufor',
        attrs: {
          rank: 'COLONEL',
          init: 'call{[this, "Curator"] call bis_fnc_setUnitInsignia;}',
          name: 'gm0',
          description: 'Game master@Zeus',
          isPlayer: 1,
        },
        customAttrs: [
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.99000001,
          },
        ],
      },
      {
        sqmId: 410,
        type: 'B_RangeMaster_F',
        side: 'blufor',
        attrs: {
          rank: 'MAJOR',
          init: 'call{[this, "Curator"] call bis_fnc_setUnitInsignia;}',
          name: 'gm1',
          description: 'Game master',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.99000001,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Game master',
      },
    ],
  },
  {
    sqmId: 497,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 498,
        type: 'B_crew_F',
        side: 'blufor',
        attrs: {
          rank: 'SERGEANT',
          name: 'vc1',
          description: 'Commander@Hotel 1',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
      {
        sqmId: 499,
        type: 'B_crew_F',
        side: 'blufor',
        attrs: {
          description: 'Gunner',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.95999998,
          },
        ],
      },
      {
        sqmId: 500,
        type: 'B_crew_F',
        side: 'blufor',
        attrs: {
          description: 'Driver',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male11ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Hotel 1',
      },
    ],
  },
  {
    sqmId: 488,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 489,
        type: 'B_engineer_F',
        side: 'blufor',
        attrs: {
          description: 'Engineer@Kilo 1',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male03ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
      {
        sqmId: 490,
        type: 'B_soldier_exp_F',
        side: 'blufor',
        attrs: {
          description: 'Expl Spec.',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male09ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
      {
        sqmId: 491,
        type: 'B_soldier_exp_F',
        side: 'blufor',
        attrs: {
          description: 'Expl. Spec',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male06ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.03,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Kilo',
      },
    ],
  },
  {
    sqmId: 502,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 503,
        type: 'B_Helipilot_F',
        side: 'blufor',
        attrs: {
          description: 'Pilot@Lima 1',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male11ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.03,
          },
        ],
      },
      {
        sqmId: 504,
        type: 'B_helicrew_F',
        side: 'blufor',
        attrs: {
          description: 'Crew',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male09ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.04,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Lima 1',
      },
    ],
  },
  {
    sqmId: 412,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 413,
        type: 'B_officer_F',
        side: 'blufor',
        attrs: {
          rank: 'COLONEL',
          name: 'plt',
          description: 'Platoon Leader@Platoon Command',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.98000002,
          },
        ],
      },
      {
        sqmId: 414,
        type: 'B_officer_F',
        side: 'blufor',
        attrs: {
          rank: 'MAJOR',
          description: '2IC',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male06ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.99000001,
          },
        ],
      },
      {
        sqmId: 415,
        type: 'B_medic_F',
        side: 'blufor',
        attrs: {
          rank: 'CORPORAL',
          description: 'Medic',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male06ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
      {
        sqmId: 416,
        type: 'B_soldier_UAV_F',
        side: 'blufor',
        attrs: {
          rank: 'CORPORAL',
          description: 'UAV Operator',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male02ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Platoon Command',
      },
    ],
  },
  {
    sqmId: 492,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 493,
        type: 'B_crew_F',
        side: 'blufor',
        attrs: {
          rank: 'SERGEANT',
          name: 'sc1',
          description: 'Commander@Sierra 1',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
      {
        sqmId: 494,
        type: 'B_crew_F',
        side: 'blufor',
        attrs: {
          description: 'Gunner',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male10ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 0.95999998,
          },
        ],
      },
      {
        sqmId: 495,
        type: 'B_crew_F',
        side: 'blufor',
        attrs: {
          description: 'Driver',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male11ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.02,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Sierra 1',
      },
    ],
  },
  {
    sqmId: 506,
    side: 'blufor',
    groupId: 'Test',
    units: [
      {
        sqmId: 507,
        type: 'B_Fighter_Pilot_F',
        side: 'blufor',
        attrs: {
          description: 'Pilot@Whiskey 1',
          isPlayable: 1,
        },
        customAttrs: [
          {
            property: 'speaker',
            expression: '_this setspeaker _value;',
            value: 'Male05ENG',
          },
          {
            property: 'pitch',
            expression: '_this setpitch _value;',
            value: 1.03,
          },
        ],
      },
    ],
    attrs: [
      {
        property: 'groupID',
        expression: '[_this, _value] call CBA_fnc_setCallsign',
        value: 'Whiskey 1',
      },
    ],
  },
]
