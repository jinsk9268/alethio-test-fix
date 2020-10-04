import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_IMG } from 'config';
import styled from 'styled-components';

const MainService = () => {
  return (
    <MainServiceBox>
      <MainOrderBox>
        <MainImg alt='curiosus mom image' src={MAIN_IMG} />
        <Order>
          <Link to='/mypage/order'>주문하기</Link>
        </Order>
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

  a {
    display: inline-flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
`;
