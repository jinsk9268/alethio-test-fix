import React, { useState, useContext, memo } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TokenContext, MenuContext } from 'Context/Context';
import { API } from 'config';
import styled from 'styled-components';

const Login = () => {
  // context
  const [token, setToken] = useContext(TokenContext);
  const [menu, setMenu] = useContext(MenuContext);

  // 라우터 history
  const mainLink = useHistory();

  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginInputs;

  const changeLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  // 로그인
  const clickLogin = async () => {
    try {
      const loginRes = await axios.post(`${API}/login`, {
        headers: { 'Content-Type': 'application/json' },
        email: email,
        password: password,
      });
      if (loginRes.status === 200) {
        setToken(loginRes.data.token);
        setMenu('');
        mainLink.push('/');
      }
    } catch (error) {
      alert('비밀번호를 다시 확인해주세요');
    }
  };

  return (
    <LoginBox>
      <AccountInputBox>
        <AccountInputBoxTitle>로그인</AccountInputBoxTitle>
        <InputBox>
          <InputTitle>이메일</InputTitle>
          <Input
            type='text'
            name='email'
            placeholder='이메일'
            onChange={changeLoginInput}
          />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
            onChange={changeLoginInput}
          />
        </InputBox>
      </AccountInputBox>
      <AcountButtonBox>
        <Button onClick={() => clickLogin()}>로그인 하기</Button>
      </AcountButtonBox>
    </LoginBox>
  );
};

export default memo(Login);

const LoginBox = styled.main`
  padding: 20px 5px;
`;

const AccountInputBox = styled.section`
  margin: 0 auto;
  width: 420px;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const AccountInputBoxTitle = styled.h1`
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

const InputTitle = styled.div`
  padding-right: 10px;
  width: 20%;
`;

const Input = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 15px;
`;

const AcountButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  background: pink;
  border-radius: 5px;
  font-size: 15px;
  letter-spacing: 0.5px;

  @media ${(props) => props.theme.mobile} {
    width: 60%;
  }
`;
