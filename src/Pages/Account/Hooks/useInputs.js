import { useReducer } from 'react';

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};
const useInputs = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeInputValue = (e) => {
    dispatch(e.target);
  };

  return [state, changeInputValue];
};

export default useInputs;
