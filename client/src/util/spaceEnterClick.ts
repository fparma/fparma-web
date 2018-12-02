import * as R from 'ramda'

const isFn = R.is(Function)
const spacOrEnter = [' ', 'Enter']
const isSpaceOrEnter = (key: string) => spacOrEnter.indexOf(key) !== -1

export const spaceEnterClick = (onClick?: () => void) => (e: React.KeyboardEvent<HTMLAnchorElement>) => {
  if (isFn(onClick) && isSpaceOrEnter(e.key)) {
    e.preventDefault()
    onClick!()
  }
}
