import * as React from 'react'
import { Navbar, ICONS, Icon } from '../../ui'

export const LeftMenu = (
  <React.Fragment>
    <Navbar.Item to="/events">
      <Icon icon={ICONS.faCalendar} style={{ color: 'rgba(255, 255, 128, 0.9)' }} />
      <span>Events</span>
    </Navbar.Item>
    <Navbar.Item to="/events">
      <Icon icon={ICONS.faImages} style={{ color: 'rgba(210, 128, 255, 0.9)' }} />
      <span>Media</span>
    </Navbar.Item>
    <Navbar.Item to="/events">
      <Icon icon={ICONS.faQuestionCircle} style={{ color: 'rgba(200, 255, 255, 1)' }} />
      <span>Wiki</span>
    </Navbar.Item>
    <Navbar.Item to="/events">
      <Icon icon={ICONS.faLandmark} style={{ color: 'rgba(60, 100, 255, 0.9)' }} />
      <span>About</span>
    </Navbar.Item>
    <Navbar.Item to="/events">
      <Icon icon={ICONS.faMagic} style={{ color: 'rgba(255,100,128, 0.9)' }} />
      <span>Admin</span>
    </Navbar.Item>
  </React.Fragment>
)
