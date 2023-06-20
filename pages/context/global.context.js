import { createContext, useContext, useState } from 'react';
import { useExploredBreedsContext } from './exploredBreeds.context';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalContext, setGlobalContext] = useState('exploring');

  //// COMPONENT
  return (
    <GlobalContext.Provider
      value={{
        globalContext,
        setGlobalContext
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('GlobalContext must be used within a GlobalProvider');
  }
  return context;
};
