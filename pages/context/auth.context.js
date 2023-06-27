import { createContext, useContext, useEffect, useReducer } from 'react';
import AuthReducer from './auth.reducer';

const INITIAL_STATE = {
  currentUser:
    typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    }
  }, [state.currentUser]);

  //// COMPONENT
  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        dispatch
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be used within a AuthProvider');
  }
  return context;
};

export default AuthProvider;