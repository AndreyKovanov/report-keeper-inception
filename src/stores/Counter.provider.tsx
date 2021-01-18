import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { CounterStore } from './Counter.store';

interface ProviderProps {
  children: ReactNode;
}

export const CounterContext = createContext<CounterStore | null>(null);

export const CounterProvider = ({ children }: ProviderProps) => {
  const store = useLocalObservable(() => new CounterStore());

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};
