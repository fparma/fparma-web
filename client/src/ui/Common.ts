import { classnames } from './utils'

export interface CommonProps {
  isClearFix?: boolean
  isPulledLeft?: boolean
  isPulledRight?: boolean
  isMarginLess?: boolean
  isPaddingLess?: boolean
  isOverlay?: boolean
  isClipped?: boolean
  isRadiusLess?: boolean
  isShadowless?: boolean
  isUnSelectable?: boolean
  isInvisible?: boolean
  isSrOnly?: boolean
}

export const commonProps = (props: Partial<CommonProps>) =>
  classnames({
    'is-clearfix': props.isClearFix,
    'is-pulled-left': props.isPulledLeft,
    'is-pulled-right': props.isPulledRight,
    'is-marginless': props.isMarginLess,
    'is-paddingless': props.isPaddingLess,
    'is-overlay': props.isOverlay,
    'is-radiusless': props.isRadiusLess,
    'is-shadowless': props.isShadowless,
    'is-unselectable': props.isUnSelectable,
    'is-invisible': props.isInvisible,
    'is-sr-only': props.isSrOnly,
  })
