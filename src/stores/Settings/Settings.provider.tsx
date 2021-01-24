import React, { createContext, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react-lite';

import { SettingsStore } from './Settings.store';

interface ProviderProps {
  children: ReactNode;
}

export const SettingsContext = createContext<SettingsStore | null>(null);

export const SettingsProvider = ({ children }: ProviderProps) => {
  const store = useLocalObservable(() => new SettingsStore());

  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  );
};
