import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
  const { dispatch: authDispatch, user } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    if (user) {
      localStorage.removeItem('user');

      authDispatch({ type: 'LOGOUT' });
      workoutsDispatch({ type: 'SET_WORKOUTS', payload: [] });
    }
  }

  return { logout };
}
