import React, { useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BEBE_LOGO } from 'config';

const Header = () => {
  // history link
  const history = useHistory();
  console.log(history.location.pathname);

  const [currentMenu, setCurrentMenu] = useState('');

  // const changeCurrentMenu = useCallback((menu) => {
  //   setCurrentMenu(menu);
  // }, []);

  const changeCurrentMenu = (menu) => {
    setCurrentMenu(menu);
  };

  return (
    <HeaderBox>
      <Logo
        alt='bebe logo'
        src={BEBE_LOGO}
        onClick={() => {
          changeCurrentMenu('');
          history.push('/');
        }}
      />
      <HeaderNav>
        <ul className='pc-nav'>
          <MenuLi
            onClick={() => {
              changeCurrentMenu('회원가입');
              history.push('/sign-up');
            }}
            changeColor={currentMenu === '회원가입' ? true : false}
          >
            회원가입
          </MenuLi>
          <MenuLi
            onClick={() => {
              changeCurrentMenu('로그인');
              history.push('/login');
            }}
            changeColor={currentMenu === '로그인' ? true : false}
          >
            로그인
          </MenuLi>
          <MenuLi
            onClick={() => {
              changeCurrentMenu('마이페이지');
              history.push('/mypage/order');
            }}
            changeColor={currentMenu === '마이페이지' ? true : false}
          >
            마이페이지
          </MenuLi>
        </ul>
        <div className='mobile-nav'>
          <i className='fas fa-bars'></i>
        </div>
      </HeaderNav>
    </HeaderBox>
  );
};

// export default memo(Header);
export default Header;

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 60px;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const HeaderNav = styled.nav`
  .pc-nav {
    display: flex;

    @media ${(props) => props.theme.mobile} {
      display: none;
    }
  }

  .mobile-nav {
    display: none;

    @media ${(props) => props.theme.mobile} {
      display: inline-block;
      font-size: 24px;
      cursor: pointer;
    }
  }
`;

const MenuLi = styled.li`
  padding-left: 15px;
  color: ${(props) => (props.changeColor ? 'pink' : 'black')};
  cursor: pointer;
`;
