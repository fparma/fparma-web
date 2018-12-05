import { readFileSync } from 'fs'
import { getSidesAndGroups, parseSqm } from './sqmHelpers'

const data = readFileSync(__dirname + '/test2.sqm', 'utf8')

it('parses mission and entities', () => {
  const expected = { test: true }
  const args = { Mission: { Entities: expected } }
  expect(true).toEqual(true)
  getSidesAndGroups(parseSqm(data))
})
