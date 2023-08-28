import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#fafafa',
        light: '#4a148c',
        dark: '#fdebff',
      },
      secondary: {
        main: '#512da8',
      },
      background: {
        paper: '#f5f5f5',
        default: '#eceff1',
      },
      error: {
        main: '#b71c1c',
      },
      warning: {
        main: '#fdd835',
      },
      info: {
        main: '#ba68c8',
      },
      text : {
        light : '#ffffff',
        dark : '#000000'
      },
      button: {
        light : '',
        dark : '#a435f0',
        default : '#a435f0'
      }
    },
});

export default theme;