import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome'
import { printClass } from './utils'

import {
  faCalendar,
  faImages,
  faLandmark,
  faMagic,
  faQuestionCircle,
  faUserTie,
  faCheckSquare,
  faSquare,
  faCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

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
}

library.add(...Object.keys(ICONS).map(v => ICONS[v]))

export const Icon: React.SFC<Props> = props => (
  <span className={printClass('icon', props.className)}>
    <FontAwesomeIcon {...props} />
  </span>
)
