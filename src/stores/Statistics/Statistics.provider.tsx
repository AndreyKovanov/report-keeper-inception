import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { StatisticsStore } from './Statistics.store';

interface ProviderProps {
  children: ReactNode;
}

export const StatisticsContext = createContext<StatisticsStore | null>(null);

export const StatisticsProvider = ({ children }: ProviderProps) => {
  const store = useLocalObservable(() => new StatisticsStore());

  return (
    <StatisticsContext.Provider value={store}>
      {children}
    </StatisticsContext.Provider>
  );
};
