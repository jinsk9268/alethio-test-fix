import React, { createContext, useReducer, memo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MobileNavModal from 'Components/MobileNavModal';

export const ContextDispatch = createContext(null);

const ContextProvider = (props) => {
  const initialState = {
    token: '',
    menu: '',
    navModalShow: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SAVE_TOKEN':
        return {
          ...state,
          token: action.token,
        };
      case 'REMOVE_TOKEN':
        return {
          ...state,
          token: '',
        };
      case 'CHANGE_MENU':
        return {
          ...state,
          menu: action.menu,
        };
      case 'SHOW_MODAL':
        return {
          ...state,
          navModalShow: true,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          navModalShow: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextDispatch.Provider value={[state, dispatch]}>
      <Router>
        {state.navModalShow && <MobileNavModal />}
        {props.children}
      </Router>
    </ContextDispatch.Provider>
  );
};

export default memo(ContextProvider);
