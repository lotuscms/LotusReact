import React from 'react';
import Register from './Register';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3'
    },
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true }
});

function App(props): React.ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <Register />
    </MuiThemeProvider>
  );
}

export default App;
