export const spaceEnterClick = (onClick?: () => void) => (e: React.KeyboardEvent<any>) =>
  onClick && ~[' ', 'Enter'].indexOf(e.key) && onClick()
