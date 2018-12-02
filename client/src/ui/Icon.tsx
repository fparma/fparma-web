import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendar,
  faCheckCircle,
  faCheckSquare,
  faCircle,
  faExclamationTriangle,
  faFile,
  faImages,
  faLandmark,
  faMagic,
  faPaste,
  faPencilAlt,
  faQuestionCircle,
  faSearch,
  faSquare,
  faTimesCircle,
  faUserCog,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { classnames } from './utils'

export const ICONS = {
  faCalendar,
  faImages,
  faQuestionCircle,
  faLandmark,
  faMagic,
  faUserTie,
  faCheckSquare,
  faSquare,
  faCircle,
  faCheckCircle,
  faCloseX: faTimesCircle,
  faExclamationTriangle,
  faPencilAlt,
  faUserCog,
  faSearch,
  faFile,
  faPaste,
}

const ICON_VALUES = Object.keys(ICONS).map(v => ICONS[v])
library.add(...ICON_VALUES)

interface IconProps {
  isWarning?: boolean
  isError?: boolean
}

export const Icon: React.SFC<Props & IconProps> = ({ className, isError, isWarning, ...rest }) => (
  <span
    className={classnames('icon', className, {
      'has-text-warning': isWarning,
      'has-text-danger': isError,
    })}
  >
    <FontAwesomeIcon {...rest} />
  </span>
)
