import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BEBE_LOGO } from 'config';

const Header = () => {
  return (
    <HeaderBox>
      <Link to='/'>
        <Logo alt='bebe logo' src={BEBE_LOGO} />
      </Link>
      <HeaderNav>
        <ul className='pc-nav'>
          <li>
            <Link to='/sign-up'>회원가입</Link>
          </li>
          <li>
            <Link to='/login'>로그인</Link>
          </li>
          <li>
            <Link to='/mypage/order'>마이페이지</Link>
          </li>
        </ul>
        <div className='mobile-nav'>
          <i className='fas fa-bars'></i>
        </div>
      </HeaderNav>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 60px;
`;

const Logo = styled.img`
  height: 40px;
`;

const HeaderNav = styled.nav`
  .pc-nav {
    display: flex;

    li {
      padding-left: 15px;
    }

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
