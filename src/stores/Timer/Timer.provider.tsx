import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { TimerStore } from './Timer.store';

interface ProviderProps {
  children: ReactNode;
}

export const TimerContext = createContext<TimerStore | null>(null);

export const TimerProvider = ({ children }: ProviderProps) => {
  const store = useLocalObservable(() => new TimerStore());

  return (
    <TimerContext.Provider value={store}>{children}</TimerContext.Provider>
  );
};
