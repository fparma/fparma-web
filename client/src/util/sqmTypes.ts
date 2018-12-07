enum Sides {
  BLUFOR = 'blufor',
  OPFOR = 'opfor',
  INDEPENDENT = 'independent',
  CIVILIAN = 'civilian',
}

const stringToSide = (side: string = ''): Sides | null =>
  ({
    west: Sides.BLUFOR,
    east: Sides.OPFOR,
    independent: Sides.INDEPENDENT,
    civilian: Sides.CIVILIAN,
  }[side.toLowerCase()] || null)

export interface Unit {
  sqmId: number
  type: string
  side: Sides
  customAttrs: Attributes[]
  attrs: {
    description: string | undefined
    init: string | undefined
    isPlayable: 0 | 1 | undefined
    isPlayer: 0 | 1 | undefined
  }
}

export interface Attributes {
  property: string | undefined
  expression: string | undefined
  value: string | number | undefined
}

export interface Groups {
  sqmId: number
  side: Sides
  units: Unit[]
  attrs: Attributes[]
}

export { stringToSide, Sides }
