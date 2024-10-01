import { colors, createTheme } from "@mui/material";

//theme
export const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#013e87',
      },
      secondary: {
        main: '#2e74c9',
      },
    },
    typography: {
      fontFamily: 'Roboto',
      h1: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.25rem',
      },
      h4: {
        fontSize: '1rem',
      },
      h5: {
        fontSize: '0.75rem',
      },
    },
  })

//layout styles
export const padding = {p: '1rem'}
export const row = {flexDirection:'row', display:'flex', alignItems:'center', gap: 1}
export const column = {flexDirection:'column', display:'flex', gap: 1}
export const textInput = {width: 1, mb: 2, '.MuiInputBase-input': {height: '0.5rem'}}
export const centerBox = {display: 'flex', alignItems: 'center', justifyContent: 'center'}

// component styles
export const page = {p: '1rem', mt: '0.1rem', minHeight: '100vh', width: 1, bgcolor: "#F7FAFF"}
export const topbar = {
  ...row,
  color: theme.palette.primary.main,
  bgcolor: "white",//,'grey'
  justifyContent: 'space-between',
  boxShadow: 1,
}
