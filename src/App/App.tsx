import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';

import { CounterProvider } from '@stores/Counter.provider';
import { AppContent } from './Routes';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CounterProvider>
      <AppContent />
    </CounterProvider>
  </ThemeProvider>
);

export default App;
