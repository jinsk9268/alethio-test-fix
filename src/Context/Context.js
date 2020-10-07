import React, { useState, createContext, memo } from 'react';

export const TokenContext = createContext(null);
export const MenuContext = createContext(null);

const ContextProvider = (props) => {
  const [token, setToken] = useState('');
  const [menu, setMenu] = useState('');

  return (
    <TokenContext.Provider value={[token, setToken]}>
      <MenuContext.Provider value={[menu, setMenu]}>
        {props.children}
      </MenuContext.Provider>
    </TokenContext.Provider>
  );
};

export default memo(ContextProvider);
