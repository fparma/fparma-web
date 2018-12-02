import * as React from 'react'
import { spaceEnterClick } from 'src/util/spaceEnterClick'
import { classnames } from './utils'

interface Props {
  className?: string
  size?: number
  isBox?: boolean
  isAncestor?: boolean
  isChild?: boolean
  isParent?: boolean
  isVertical?: boolean
  onClick?: () => void
}
export const Tile: React.SFC<Props> = ({
  className,
  children,
  size,
  isBox,
  isAncestor,
  isChild,
  isParent,
  isVertical,
  onClick,
}) => {
  const Type = onClick ? 'a' : 'div'
  return (
    <Type
      className={classnames('tile', className, {
        [`is-${size}`]: !!size,
        box: isBox,
        'is-ancestor': isAncestor,
        'is-child': isChild,
        'is-parent': isParent,
        'is-vertical': isVertical,
      })}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={spaceEnterClick(onClick)}
    >
      {children}
    </Type>
  )
}
