import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowsAlt,
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
  faRedo,
  faSearch,
  faSquare,
  faTimesCircle,
  faUserCog,
  faUserFriends,
  faUserMinus,
  faUserPlus,
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
  faArrowsAlt,
  faUserPlus,
  faUserMinus,
  faUserFriends,
  faRedo,
}

library.add(...Object.keys(ICONS).map(v => ICONS[v]))

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
