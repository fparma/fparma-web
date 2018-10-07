import * as React from 'react'
import { Icon, ICONS, Navbar } from '../../ui'

export const RightMenu = (
  <Navbar.Item to="/">
    <Icon icon={ICONS.faUserTie} style={{ color: 'rgba(40, 255, 40, 0.7)' }} />
    <span>Profile</span>
  </Navbar.Item>
)
