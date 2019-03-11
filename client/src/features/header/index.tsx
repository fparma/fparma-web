import { Button } from '@material-ui/core'
import React from 'react'
import { Grid, Text } from '../components'
import ShadowBackground from './ShadowBackground'

const styles = {
  container: {
    height: '100%',
    padding: '0 5%',
  },
}

const Header = () => (
  <ShadowBackground>
    <Grid container alignItems="center" justify="space-between" style={styles.container} spacing={8}>
      <Grid item>
        <Text.H4>FPARMA</Text.H4>
      </Grid>
      <Grid item>
        <Button disableRipple variant="outlined">
          Login
        </Button>
      </Grid>
    </Grid>
  </ShadowBackground>
)

export default Header
