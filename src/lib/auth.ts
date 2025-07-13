const ADMIN_USERNAME = 'SuperAdmin';
const ADMIN_PASSWORD = 'PtksanAkash123';
const AUTH_TOKEN_KEY = 'adminAuthToken';

export const login = (username: string, password: string): boolean => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // In a real application, you would generate a secure token here
    localStorage.setItem(AUTH_TOKEN_KEY, 'authenticated');
    return true;
  }
  return false;
};

export const isAuthenticated = (): boolean => {
  return typeof window !== 'undefined' && localStorage.getItem(AUTH_TOKEN_KEY) === 'authenticated';
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};