import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalContext, setGlobalContext] = useState('exploring');
  const [showLoadingScreen, setShowLoadingScreen] = useState('none');

  //// COMPONENT
  return (
    <GlobalContext.Provider
      value={{
        globalContext,
        setGlobalContext,
        showLoadingScreen,
        setShowLoadingScreen
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
