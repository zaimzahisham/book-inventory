import { createTheme } from "@mui/material";

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
        fontSize: '3rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '2rem',
      },
      h4: {
        fontSize: '1.5rem',
      },
    },
  })

export const page = {
  p: '1rem',
  mt: '1rem',
  height: 1
} 

export const topbar = {
  bgcolor: 'background.paper',
}

export const card = {
  bgcolor: 'grey',
  border: '2px solid #000',
  boxShadow: 24,
}