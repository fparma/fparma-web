import * as React from 'react'
import { spaceEnterClick } from '../util/spaceEnterClick'
import { classnames } from './utils'

interface Props {
  className?: string
  size?: number
  isBox?: boolean
  isAncestor?: boolean
  isChild?: boolean
  isParent?: boolean
  isVertical?: boolean
  hasShadow?: boolean
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
  hasShadow,
}) => {
  const Type = (onClick ? 'a' : 'div') as any
  return (
    <Type
      className={classnames('tile', className, {
        [`is-${size}`]: !!size,
        box: isBox,
        'is-ancestor': isAncestor,
        'is-child': isChild,
        'is-parent': isParent,
        'is-vertical': isVertical,
        'has-shadow': hasShadow,
      })}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={spaceEnterClick(onClick)}
    >
      {children}
    </Type>
  )
}
