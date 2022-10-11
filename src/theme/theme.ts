import { createTheme } from "@mui/material/styles"
import { colors } from "./colors"

// Create a theme instance.
const theme = createTheme({
  // @ts-ignore
  shadows: ["none"],
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: colors.app.primary,
    },
    secondary: {
      main: colors.app.secondary,
    },
    common: {
      black: "hsla(206, 10.1%, 13.5%, 1)"
    },
  },
  typography: {
    fontFamily: "Satoshi",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        outlined: {
          borderWidth: '2px'       
          // borderInline: "2px solid"
        },
        root: {          
          textTransform: "capitalize",          
        },        
        contained: {
          boxShadow: "none",
          textTransform: "capitalize",
        },
      },
    },
  },
})

export default theme