import React, { useState, createContext, memo } from 'react';
import MobileNavModal from 'Components/MobileNavModal';
export const MenuContext = createContext(null);
export const MobileNavContext = createContext(null);
export const TokenContext = createContext(null);

const ContextProvider = (props) => {
  const [menu, setMenu] = useState('');
  const [navModalShow, setNavModalShow] = useState(false);
  const [token, setToken] = useState('');

  return (
    <MenuContext.Provider value={[menu, setMenu]}>
      <MobileNavContext.Provider value={[navModalShow, setNavModalShow]}>
        <TokenContext.Provider value={[token, setToken]}>
          {props.children}
          {navModalShow && <MobileNavModal />}
        </TokenContext.Provider>
      </MobileNavContext.Provider>
    </MenuContext.Provider>
  );
};

export default memo(ContextProvider);
