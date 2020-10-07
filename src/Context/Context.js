import React, { useState, createContext, memo } from 'react';

export const MenuContext = createContext(null);
export const TokenContext = createContext(null);

const ContextProvider = (props) => {
  const [token, setToken] = useState('');
  const [menu, setMenu] = useState('');

  return (
    <MenuContext.Provider value={[menu, setMenu]}>
      <TokenContext.Provider value={[token, setToken]}>
        {props.children}
      </TokenContext.Provider>
    </MenuContext.Provider>
  );
};

export default memo(ContextProvider);
