import { createMuiTheme } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const palette: PaletteOptions = {
  type: 'dark',
  background: {
    default: '#262728',
  },
  primary: {
    main: '#ff9895',
  },
  secondary: {
    main: '#D97FA5',
  },
}

const defaultTheme = createMuiTheme({ palette })
const {
  breakpoints,
  typography: { pxToRem },
} = defaultTheme

const typography: TypographyOptions = {
  useNextVariants: true,
  fontSize: 18,
  htmlFontSize: 10,
  fontFamily: ['Merriweather', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  h1: {
    fontSize: '5rem',
    [breakpoints.down('md')]: {
      fontSize: '4rem',
    },
  },
  h2: {
    fontSize: '4.2rem',
    [breakpoints.down('md')]: {
      fontSize: '3.4rem',
    },
  },
  h3: {
    fontSize: '3.8rem',
    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
  },
  h4: {
    fontSize: '3.2rem',
    [breakpoints.down('md')]: {
      fontSize: '2.4rem',
    },
  },
}

export default createMuiTheme({ palette, typography })
