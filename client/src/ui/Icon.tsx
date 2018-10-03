import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faImages,
  faQuestionCircle,
  faLandmark,
  faMagic,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { printClass } from './utils'

export const ICONS = {
  faCalendar,
  faImages,
  faQuestionCircle,
  faLandmark,
  faMagic,
  faUserTie,
}

library.add(...Object.keys(ICONS).map(v => ICONS[v]))

export const Icon: React.SFC<Props> = props => (
  <span className={printClass('icon', props.className)}>
    <FontAwesomeIcon {...props} />
  </span>
)
