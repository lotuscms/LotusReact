import React from 'react';
import Register from './Register';
import { createHttpLink } from 'apollo-link-http';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3'
    },
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true }
});

export const gqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App(props): React.ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={gqlClient}>
        <Register client={gqlClient}/>
      </ApolloProvider>
    </MuiThemeProvider>
  );
}

export default App;
