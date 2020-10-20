import React, { useContext, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextDispatch } from 'Context/Context';
import { BEBE_LOGO } from 'config';
import styled from 'styled-components';

const MobileNavModal = () => {
  // context
  const [state, dispatch] = useContext(ContextDispatch);

  // 라우터 history
  const history = useHistory();

  const clickMenu = useCallback(
    (menu, url) => {
      switch (menu) {
        case '':
          dispatch({ type: 'CHANGE_MENU', menu });
          dispatch({ type: 'CLOSE_MODAL' });
          history.push(url);
          break;
        case '회원가입':
          dispatch({ type: 'CHANGE_MENU', menu });
          dispatch({ type: 'CLOSE_MODAL' });
          history.push(url);
          break;
        case '로그인':
          dispatch({ type: 'CHANGE_MENU', menu });
          dispatch({ type: 'CLOSE_MODAL' });
          history.push(url);
          break;
        case '로그아웃':
          dispatch({ type: 'REMOVE_TOKEN' });
          dispatch({ type: 'CHANGE_MENU', menu: '' });
          alert('로그아웃 되었습니다');
          dispatch({ type: 'CLOSE_MODAL' });
          history.push(url);
          break;
        case '마이페이지':
          state.token
            ? (function () {
                dispatch({ type: 'CHANGE_MENU', menu });
                dispatch({ type: 'CLOSE_MODAL' });
                history.push(url);
              })()
            : (function () {
                alert('로그인을 해주세요');
                dispatch({ type: 'CHANGE_MENU', menu: '회원가입' });
                dispatch({ type: 'CLOSE_MODAL' });
                history.push('/sign-up');
              })();
          break;
        default:
          dispatch({ type: 'CHANGE_MENU', menu: '' });
          dispatch({ type: 'CLOSE_MODAL' });
          history.push('/');
          break;
      }
    },
    [dispatch, history, state.token],
  );

  return (
    <MobileNav>
      <ModalClose>
        <i
          className='fas fa-times'
          onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
        ></i>
      </ModalClose>
      <MobileMenuList>
        <Logo
          src={BEBE_LOGO}
          alt='babyface 로고'
          onClick={() => clickMenu('', '/')}
        />
        <MenuList>
          <MenuLi
            onClick={() => clickMenu('회원가입', '/sign-up')}
            changeColor={state.menu === '회원가입' ? true : false}
          >
            회원가입
          </MenuLi>
          {/* 원래 token */}
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
        </MenuList>
      </MobileMenuList>
    </MobileNav>
  );
};

export default memo(MobileNavModal);

const MobileNav = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: pink;
`;

const ModalClose = styled.div`
  display: flex;
  justify-content: flex-end;

  i {
    padding: 10px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const MobileMenuList = styled.div`
  margin-top: 20px;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 30px auto;
  width: 60%;
  cursor: pointer;
`;

const MenuList = styled.ul`
  width: 100%;
`;

const MenuLi = styled.li`
  margin: 10px 0;
  padding: 20px;
  background: white;
  border-radius: 5px;
  color: ${(props) => (props.changeColor ? 'pink' : 'black')};
  text-align: center;
  cursor: pointer;
`;
