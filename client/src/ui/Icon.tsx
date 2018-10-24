import { library } from '@fortawesome/fontawesome-svg-core'
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
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { printClass } from './utils'

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
  faCheckCircle
}

library.add(...Object.keys(ICONS).map(v => ICONS[v]))

export const Icon: React.SFC<Props> = props => (
  <span className={printClass('icon', props.className)}>
    <FontAwesomeIcon {...props} />
  </span>
)
