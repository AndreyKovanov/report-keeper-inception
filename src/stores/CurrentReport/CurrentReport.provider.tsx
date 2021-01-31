import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { useStore } from '@helpers/store';
import { TimerContext } from '@stores/Timer/Timer.provider';
import { CurrentReportStore } from './CurrentReport.store';

interface ProviderProps {
  children: ReactNode;
}

export const CurrentReportContext = createContext<CurrentReportStore | null>(
  null
);

export const CurrentReportProvider = ({ children }: ProviderProps) => {
  const timerStore = useStore(TimerContext);
  const store = useLocalObservable(() => new CurrentReportStore(timerStore));

  return (
    <CurrentReportContext.Provider value={store}>
      {children}
    </CurrentReportContext.Provider>
  );
};
