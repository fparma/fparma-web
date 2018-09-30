import * as React from 'react'
import { Navbar, ICONS, Icon } from '../../ui'

export const LeftMenu = (
  <React.Fragment>
    <Navbar.Item>
      <Icon icon={ICONS.faCalendar} style={{ color: 'rgba(255, 255, 128, 0.9)' }} />
      <p>Events</p>
    </Navbar.Item>
    <Navbar.Item>
      <Icon icon={ICONS.faImages} style={{ color: 'rgba(210, 128, 255, 0.9)' }} />
      <p>Media</p>
    </Navbar.Item>
    <Navbar.Item>
      <Icon icon={ICONS.faQuestionCircle} style={{ color: 'rgba(200, 255, 255, 1)' }} />
      <p>Wiki</p>
    </Navbar.Item>
    <Navbar.Item>
      <Icon icon={ICONS.faLandmark} style={{ color: 'rgba(60, 100, 255, 0.9)' }} />
      <p>About</p>
    </Navbar.Item>
    <Navbar.Item>
      <Icon icon={ICONS.faMagic} style={{ color: 'rgba(255,100,128, 0.9)' }} />
      <p>Admin</p>
    </Navbar.Item>
  </React.Fragment>
)
