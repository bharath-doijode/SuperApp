import React from 'react';
import AuthService from '../services/AuthService';
import {AuthContext} from '../contexts/AuthContext';

enum ActionTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

type Action = {
  type: ActionTypes;
  payload?: any;
};


type State = {
  isLoading: boolean;
  isSignout: boolean;
  role: string;
};

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        isSignout: action.payload.isSignout,
        isLoading: false,
        role: action.payload.role
      };
    case ActionTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        role: action.payload
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        role: ''
      };
    default:
      return prevState;
  }
};

const AuthProvider = ({
  children,
}: {
  children: (data: State) => React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: false,
    isSignout: false,
    role: ''
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async (role: string) => {
        try {
          await AuthService.shared.setUserRole(role);
          await AuthService.shared.setCredentials('dummy-auth-token');
        } catch (e) {
          // Handle error
        }

        dispatch({type: ActionTypes.SIGN_IN, payload: role});
      },
      signOut: async () => {
        try {
          await AuthService.shared.removeUserRole();
          await AuthService.shared.removeCredentials();
        } catch (e) {
          // Handle error
        }

        dispatch({type: ActionTypes.SIGN_OUT});
      },
      signUp: async (role: string) => {
        try {
          await AuthService.shared.setCredentials('dummy-auth-token');
        } catch (e) {
          // Handle error
        }

        dispatch({type: ActionTypes.SIGN_IN, payload: role});
      },
    }),
    [],
  );

  React.useEffect(() => {
    const restoreToken = async () => {
      let userToken;
      let role;

      try {
        userToken = await AuthService.shared.getCredentials();
        role = await AuthService.shared.getUserRole();
      } catch (e) {
        // Handle error
      }
      
      dispatch({type: ActionTypes.RESTORE_TOKEN, payload: {isSignout :!userToken, role: role}});
    };

    restoreToken();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {children(state)}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
