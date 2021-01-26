import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { CurrentReportStore } from './CurrentReport.store';

interface ProviderProps {
  children: ReactNode;
}

export const CurrentReportContext = createContext<CurrentReportStore | null>(
  null
);

export const CurrentReportProvider = ({ children }: ProviderProps) => {
  const store = useLocalObservable(() => new CurrentReportStore());

  return (
    <CurrentReportContext.Provider value={store}>
      {children}
    </CurrentReportContext.Provider>
  );
};
