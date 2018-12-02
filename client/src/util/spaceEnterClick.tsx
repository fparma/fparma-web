export const spaceEnterClick = (onClick?: () => void) => (e: React.KeyboardEvent<HTMLAnchorElement>) =>
  onClick && ~[' ', 'Enter'].indexOf(e.key) && onClick()
