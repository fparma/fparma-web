import * as React from 'react'
import { Navbar, ICONS, Icon } from '../../ui'

export const RightMenu = (
  <Navbar.Item>
    <Icon icon={ICONS.faUserTie} style={{ color: 'rgba(40, 255, 40, 0.7)' }}  />
    <span>Profile</span>
  </Navbar.Item>
)
