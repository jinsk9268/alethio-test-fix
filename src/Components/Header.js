import React, { useContext, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextDispatch } from 'Context/Context';
import { BEBE_LOGO } from 'config';
import styled from 'styled-components';

const Header = () => {
  // context
  const [state, dispatch] = useContext(ContextDispatch);

  // 라우터 history
  const history = useHistory();

  const clickMenu = useCallback(
    (menu, url) => {
      switch (menu) {
        case '':
          dispatch({ type: 'CHANGE_MENU', menu });
          history.push(url);
          break;
        case '회원가입':
          dispatch({ type: 'CHANGE_MENU', menu });
          history.push(url);
          break;
        case '로그인':
          dispatch({ type: 'CHANGE_MENU', menu });
          history.push(url);
          break;
        case '로그아웃':
          dispatch({ type: 'REMOVE_TOKEN' });
          dispatch({ type: 'CHANGE_MENU', menu: '' });
          alert('로그아웃 되었습니다');
          history.push(url);
          break;
        case '마이페이지':
          state.token
            ? (function () {
                dispatch({ type: 'CHANGE_MENU', menu });
                history.push(url);
              })()
            : (function () {
                alert('로그인을 해주세요');
                dispatch({ type: 'CHANGE_MENU', menu: '회원가입' });
                history.push('/sign-up');
              })();
          break;
        default:
          dispatch({ type: 'CHANGE_MENU', menu: '' });
          history.push('/');
          break;
      }
    },
    [dispatch, history, state.token],
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
            changeColor={state.menu === '회원가입' ? true : false}
          >
            회원가입
          </MenuLi>
          {state.token ? (
            <MenuLi onClick={() => clickMenu('로그아웃', '/logout')}>
              로그아웃
            </MenuLi>
          ) : (
            <MenuLi
              onClick={() => clickMenu('로그인', '/login')}
              changeColor={state.menu === '로그인' ? true : false}
            >
              로그인
            </MenuLi>
          )}
          <MenuLi
            onClick={() => clickMenu('마이페이지', '/mypage/order')}
            changeColor={state.menu === '마이페이지' ? true : false}
          >
            마이페이지
          </MenuLi>
        </PcNav>
        <MobileNav onClick={() => dispatch({ type: 'SHOW_MODAL' })}>
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
