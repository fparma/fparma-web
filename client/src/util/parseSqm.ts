import { parse } from 'arma-class-parser'

export const parseSqm = (sqm: string) => {
  return parse(sqm)
}
