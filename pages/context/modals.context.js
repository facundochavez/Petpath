import { createContext, useContext, useState } from 'react';

export const ModalsContext = createContext();

const ModalsProvider = ({ children }) => {
  const [pathModalOpen, setPathModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [confirmRestartModalOpen, setConfirmRestartModalOpen] = useState(false);
  const [confirmLogoutModalOpen, setConfirmLogoutModalOpen] = useState(false);
  const [resetPasswordForm, setResetPasswordForm] = useState(false);

  //// COMPONENT
  return (
    <ModalsContext.Provider
      value={{
        pathModalOpen,
        setPathModalOpen,
        loginModalOpen,
        setLoginModalOpen,
        confirmRestartModalOpen,
        setConfirmRestartModalOpen,
        confirmLogoutModalOpen,
        setConfirmLogoutModalOpen,
        resetPasswordForm,
        setResetPasswordForm
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

export default ModalsProvider;