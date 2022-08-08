import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        ...state,
        workouts: action.payload,
      }
    case 'CREATE_WORKOUT':
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      }
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id),
      }
    case 'EDIT_WORKOUT':
      return {
        ...state,
        workouts: [action.payload, ...state.workouts.filter((workout) => workout._id !== action.payload._id)],
      }
    case 'EDIT_WORKOUT_FORM':
      return {
        ...state,
        editedWorkout: action.payload,
      }
    case 'EDIT_WORKOUT_CLEAR_FORM':
      return {
        ...state,
        editedWorkout: null,
      }
    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    editedWorkout: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  );
}
