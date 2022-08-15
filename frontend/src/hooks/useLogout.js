import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      console.log('no logged in user');
    } else if (user) {
      console.log('logging out user', user);
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  }

  return { logout };
}
