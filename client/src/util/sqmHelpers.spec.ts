import { readFileSync } from 'fs'
import { getSidesAndGroups } from './sqmHelpers'
import { Sides } from './sqmTypes'

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
  })

  const res = getSidesAndGroups(args)
  expect(res.length).toEqual(1)
  expect(res[0].units.length).toEqual(1)
  expect(res[0]).toEqual(
    expect.objectContaining({
      sqmId: 0,
      side: Sides.BLUFOR,
      attrs: [],
      units: [
        {
          sqmId: 1,
          type: 'test',
          side: Sides.BLUFOR,
          attrs: { isPlayable: 1 },
          customAttrs: [],
        },
      ],
    })
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
      side: Sides.BLUFOR,
      attrs: [],
      units: [
        {
          sqmId: 1,
          type: 'test',
          side: Sides.BLUFOR,
          attrs: { isPlayable: 1 },
          customAttrs: [],
        },
      ],
    })
  )
})
