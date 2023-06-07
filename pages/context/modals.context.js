import { createContext, useContext, useState } from 'react';

export const ModalsContext = createContext();

export const ModalsProvider = ({ children }) => {
  const [pathModalOpen, setPathModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  //// COMPONENT
  return (
    <ModalsContext.Provider
      value={{
        pathModalOpen,
        setPathModalOpen,
        loginModalOpen,
        setLoginModalOpen
      }}>
      {children}
    </ModalsContext.Provider>
  );
};

export const useModalsContext = () => {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error('ModalsContext must be used within a ModalsProvider');
  }
  return context;
};
