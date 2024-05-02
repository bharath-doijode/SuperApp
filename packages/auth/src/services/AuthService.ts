import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  TOKEN_KEY = 'token';
  USER_ROLE = 'user_role';

  getCredentials(): Promise<string | null> {
    return AsyncStorage.getItem(this.TOKEN_KEY);
  }

  setCredentials(token: string): Promise<void> {
    return AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  setUserRole(role: string): Promise<void> {
    return AsyncStorage.setItem(this.USER_ROLE, role);
  }

  getUserRole(): Promise<string | null> {
    return AsyncStorage.getItem(this.USER_ROLE);
  }

  removeCredentials(): Promise<void> {
    return AsyncStorage.removeItem(this.TOKEN_KEY);
  }

  removeUserRole(): Promise<void> {
    return AsyncStorage.removeItem(this.USER_ROLE);
  }

  static shared = new AuthService();
}

export default AuthService;
