import { getSidesAndGroups } from './sqmHelpers'
import { Group, Sides, Unit } from './sqmTypes'

const createData = (obj?: object) => ({ Mission: { Entities: { ...obj } } })

it('returns empty array when no groups', () => {
  const args = createData()
  expect(getSidesAndGroups(args)).toEqual([])
})

it('parses a group in entities', () => {
  const args = createData({
    Item0: {
      id: 0,
      dataType: 'Group',
      side: 'West',
      CustomAttributes: {
        Attribute0: {
          property: 'groupID',
          expression: '[_this, _value] call CBA_fnc_setCallsign',
          Value: {
            data: {
              value: 'TEST',
            },
          },
        },
      },
      Entities: {
        Item0: {
          id: 1,
          dataType: 'Object',
          side: 'West',
          type: 'test',
          Attributes: {
            description: 'TEST@TEST',
            isPlayable: 1,
          },
        },
      },
    },
  })

  const res = getSidesAndGroups(args)
  expect(res.length).toEqual(1)
  expect(res[0].units.length).toEqual(1)
  expect(res[0]).toEqual(
    expect.objectContaining({
      sqmId: 0,
      side: Sides.BLUFOR,
      groupId: 'TEST',
      attrs: [
        {
          property: 'groupID',
          expression: '[_this, _value] call CBA_fnc_setCallsign',
          value: 'TEST',
        },
      ],
      units: [
        {
          sqmId: 1,
          type: 'test',
          side: Sides.BLUFOR,
          attrs: { isPlayable: 1, description: 'TEST' },
          customAttrs: [],
        },
      ] as Unit[],
    } as Group)
  )
})

it('parses a group in layers', () => {
  const args = createData({
    Item0: {
      dataType: 'Layer',
      Entities: {
        Item0: {
          id: 0,
          dataType: 'Group',
          side: 'West',
          Entities: {
            Item0: {
              id: 1,
              dataType: 'Object',
              side: 'West',
              type: 'test',
              Attributes: {
                isPlayable: 1,
              },
            },
          },
        },
      },
    },
  })

  const res = getSidesAndGroups(args)
  expect(res.length).toEqual(1)
  expect(res[0].units.length).toEqual(1)
  expect(res[0]).toEqual(
    expect.objectContaining({
      sqmId: 0,
      groupId: '',
      side: Sides.BLUFOR,
      attrs: [],
      units: [
        {
          sqmId: 1,
          type: 'test',
          side: Sides.BLUFOR,
          attrs: { isPlayable: 1, description: '' },
          customAttrs: [],
        },
      ] as Unit[],
    } as Group)
  )
})
