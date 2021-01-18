import React, { createContext, ReactNode } from 'react';
import { useLocalStore } from 'mobx-react-lite';

import { CounterStore } from './Counter.store';

interface ProviderProps {
  children: ReactNode;
}

export const CounterContext = createContext<CounterStore | null>(null);

export const CounterProvider = ({ children }: ProviderProps) => {
  const store = useLocalStore(() => new CounterStore());

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};
