import { useReducer } from 'react';

const inputReducer = (initialState, action) => {
  return {
    ...initialState,
    [action.name]: action.value,
  };
};

const useInputs = (initialState) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const changeInputValue = (e) => {
    dispatch(e.target);
  };

  return [inputState, changeInputValue];
};

export default useInputs;
