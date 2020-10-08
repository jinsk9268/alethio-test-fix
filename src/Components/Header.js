import React, { useContext, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuContext, MobileNavContext, TokenContext } from 'Context/Context';
import styled from 'styled-components';
import { BEBE_LOGO } from 'config';

const Header = () => {
  // context
  const [menu, setMenu] = useContext(MenuContext);
  const [navModalShow, setNavModalShow] = useContext(MobileNavContext);
  const [token, setToken] = useContext(TokenContext);

  // 라우터 history
  const history = useHistory();

  const changeCurrentMenu = useCallback(
    (menu) => {
      setMenu(menu);
    },
    [setMenu],
  );

  const clickMenu = useCallback(
    (menu, url) => {
      switch (menu) {
        case '':
          changeCurrentMenu(menu);
          history.push(url);
          break;
        case '회원가입':
          changeCurrentMenu(menu);
          history.replace(url);
          break;
        case '로그인':
          changeCurrentMenu(menu);
          history.push(url);
          break;
        case '로그아웃':
          setToken('');
          changeCurrentMenu('');
          alert('로그아웃 되었습니다');
          history.push(url);
          break;
        case '마이페이지':
          if (token) {
            changeCurrentMenu(menu);
            history.push(url);
          } else {
            alert('로그인을 해주세요');
            changeCurrentMenu('회원가입');
            history.push('/sign-up');
          }
          break;
        default:
          changeCurrentMenu('');
          history.push('/');
          break;
      }
    },
    [changeCurrentMenu, history, setToken, token],
  );

  return (
    <HeaderBox>
      <Logo
        alt='bebe logo'
        src={BEBE_LOGO}
        onClick={() => clickMenu('', '/')}
      />
      <HeaderNav>
        <PcNav>
          <MenuLi
            onClick={() => clickMenu('회원가입', '/sign-up')}
            changeColor={menu === '회원가입' ? true : false}
          >
            회원가입
          </MenuLi>
          {token ? (
            <MenuLi onClick={() => clickMenu('로그아웃', '/logout')}>
              로그아웃
            </MenuLi>
          ) : (
            <MenuLi
              onClick={() => clickMenu('로그인', '/login')}
              changeColor={menu === '로그인' ? true : false}
            >
              로그인
            </MenuLi>
          )}
          <MenuLi
            onClick={() => clickMenu('마이페이지', '/mypage/order')}
            changeColor={menu === '마이페이지' ? true : false}
          >
            마이페이지
          </MenuLi>
        </PcNav>
        <MobileNav onClick={() => setNavModalShow(true)}>
          <i className='fas fa-bars'></i>
        </MobileNav>
      </HeaderNav>
    </HeaderBox>
  );
};

export default memo(Header);

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  height: 60px;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const HeaderNav = styled.nav``;

const PcNav = styled.ul`
  display: flex;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const MobileNav = styled.div`
  display: none;

  @media ${(props) => props.theme.mobile} {
    display: inline-block;
    font-size: 24px;
    cursor: pointer;
  }
`;

const MenuLi = styled.li`
  padding-left: 15px;
  color: ${(props) => (props.changeColor ? 'pink' : 'black')};
  cursor: pointer;
`;
