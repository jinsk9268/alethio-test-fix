import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TokenContext, MenuContext } from 'Context/Context';
import { MAIN_IMG } from 'config';
import styled from 'styled-components';

const MainService = () => {
  // token
  const [token, setToken] = useContext(TokenContext);
  const [menu, setMenu] = useContext(MenuContext);

  // 라우터 history
  const history = useHistory();

  const checkToken = () => {
    if (token) {
      alert('주문에 성공했습니다');
    } else {
      alert('로그인을 해주세요');
      setMenu('회원가입');
      history.push('/sign-up');
    }
  };

  return (
    <MainServiceBox>
      <MainOrderBox>
        <MainImg alt='curiosus mom image' src={MAIN_IMG} />
        <Order onClick={() => checkToken()}>주문하기</Order>
      </MainOrderBox>
    </MainServiceBox>
  );
};

export default MainService;

const MainServiceBox = styled.main`
  padding: 20px 5px;
`;

const MainOrderBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImg = styled.img`
  width: 600px;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Order = styled.button`
  margin-top: 30px;
  width: 300px;
  height: 50px;
  background-color: pink;
  border-radius: 5px;
  font-size: 16px;
  letter-spacing: 0.5px;

  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
`;
