import { useReducer } from 'react';

const inputReducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const useInputs = (initialState) => {
  const [state, dispatch] = useReducer(inputReducer, initialState);

  const changeInputValue = (e) => {
    dispatch(e.target);
  };

  return [state, changeInputValue];
};

export default useInputs;
