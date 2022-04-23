import { createContext, useContext } from 'react';

export const AppContext = createContext({ isPadding: true });

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
};
