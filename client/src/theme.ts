import { createMuiTheme } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const palette: PaletteOptions = {
  type: 'dark',
  background: {
    default: '#1c1c1c',
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
  body1: {
    fontSize: '1.8rem',
    lineHeight: '1.375em',
    [breakpoints.down('md')]: {
      fontSize: '1.8rem',
      lineHeight: '1.25em',
    },
  },
  h1: {
    fontSize: '4.8rem',
    lineHeight: '1.05em',
    [breakpoints.down('md')]: {
      fontSize: '3.6rem',
      lineHeight: '1.25em',
    },
  },
  h2: {
    fontSize: '3.6rem',
    lineHeight: '1.25em',
    [breakpoints.down('md')]: {
      fontSize: '2.8rem',
      lineHeight: '1.15em',
    },
  },
  h3: {
    fontSize: '2.8rem',
    lineHeight: '1.25em',
    [breakpoints.down('md')]: {
      fontSize: '2.2rem',
      lineHeight: '1.136em',
    },
  },
  h4: {
    fontSize: '2.2rem',
    lineHeight: '1.2222em',
    [breakpoints.down('md')]: {
      fontSize: '1.8em',
      lineHeight: '1.25em',
    },
  },
}

export default createMuiTheme({ palette, typography })
