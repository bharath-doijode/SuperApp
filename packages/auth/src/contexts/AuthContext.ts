import React from 'react';

const AuthContext = React.createContext({
  signIn: (role: string) => {},
  signOut: () => {},
  signUp: (role: string) => {},
});

const useAuth = () => React.useContext(AuthContext);

export {useAuth, AuthContext};
