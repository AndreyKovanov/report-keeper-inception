import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';

import { CounterProvider } from '@stores/Counter.provider';
import { TimerProvider } from '@stores/Timer/Timer.provider';
import { StatisticsProvider } from '@stores/Statistics/Statistics.provider';
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
      <TimerProvider>
        <StatisticsProvider>
          <AppContent />
        </StatisticsProvider>
      </TimerProvider>
    </CounterProvider>
  </ThemeProvider>
);

export default App;
