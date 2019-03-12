import { Toolbar, withStyles } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Text } from '../components'
import ShadowBackground from './ShadowBackground'

const Home = styled(Text.H4)`
  && {
    line-height: 0.7;
  }
`
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const Header = ({ classes }: { classes: any }) => (
  <ShadowBackground>
    <div className={classes.root}>
      <Toolbar>
        <Text.H4 className={classes.grow}>Photos</Text.H4>
      </Toolbar>
    </div>
  </ShadowBackground>
)

export default withStyles(styles)(Header)
