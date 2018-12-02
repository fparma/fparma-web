import { getSidesAndGroups } from './sqmHelpers'

it('parses mission and entities', () => {
  const expected = { test: true }
  const args = { Mission: { Entities: expected } }
  expect(getSidesAndGroups(args)).toEqual(expected)
})
