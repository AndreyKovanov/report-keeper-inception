import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';

import { CounterProvider } from '@stores/Counter.provider';
import { TimerProvider } from '@stores/Timer/Timer.provider';
import { StatisticsProvider } from '@stores/Statistics/Statistics.provider';
import { SettingsProvider } from '@stores/Settings/Settings.provider';
import { CurrentReportProvider } from '@stores/CurrentReport/CurrentReport.provider';
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
      <SettingsProvider>
        <TimerProvider>
          <CurrentReportProvider>
            <StatisticsProvider>
              <AppContent />
            </StatisticsProvider>
          </CurrentReportProvider>
        </TimerProvider>
      </SettingsProvider>
    </CounterProvider>
  </ThemeProvider>
);

export default App;
