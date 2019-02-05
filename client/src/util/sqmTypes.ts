export enum Sides {
  BLUFOR = 'blufor',
  OPFOR = 'opfor',
  INDEPENDENT = 'independent',
  CIVILIAN = 'civilian',
}

export const stringToSide = (side: string = ''): Sides | null =>
  ({
    west: Sides.BLUFOR,
    east: Sides.OPFOR,
    independent: Sides.INDEPENDENT,
    civilian: Sides.CIVILIAN,
  }[side.toLowerCase()] || null)

export interface Attributes {
  property?: string
  expression?: string
  value?: string | number
}

export interface Unit {
  id: number
  type: string
  side: Sides
  customAttrs: Attributes[]
  attrs: {
    description?: string
    init?: string
    isPlayable?: 0 | 1
    isPlayer?: 0 | 1
  }
}

export interface Group {
  id: number
  side: Sides
  name: string
  units: Unit[]
  attrs?: Attributes[]
}

export interface ParsedGroups {
  blufor: Group[]
  opfor: Group[]
  independent: Group[]
  civilian: Group[]
}
