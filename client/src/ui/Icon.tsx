import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendar,
  faCheckCircle,
  faCheckSquare,
  faCircle,
  faExclamationTriangle,
  faImages,
  faLandmark,
  faMagic,
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
}

library.add(...Object.keys(ICONS).map(v => ICONS[v]))

export const Icon: React.SFC<Props> = props => (
  <span className={classnames('icon', props.className)}>
    <FontAwesomeIcon {...props} />
  </span>
)
