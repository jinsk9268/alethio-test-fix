import React, { useContext, memo } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ContextDispatch } from 'Context/Context';
import useInputs from './Hooks/useInputs';
import { API, HEADERS } from 'config';
import styled from 'styled-components';

const Login = () => {
  // context
  const [state, dispatch] = useContext(ContextDispatch);

  // 라우터 history
  const history = useHistory();

  const [inputState, changeInputValue] = useInputs({
    email: '',
    password: '',
  });

  const { email, password } = inputState;

  // 로그인
  const clickLogin = async () => {
    try {
      const loginRes = await axios.post(`${API}/login`, {
        HEADERS,
        email: email,
        password: password,
      });
      if (loginRes.status === 200) {
        dispatch({ type: 'SAVE_TOKEN', token: loginRes.data.token });
        dispatch({ type: 'CHANGE_MENU', menu: '' });
        history.push('/');
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
            onChange={changeInputValue}
          />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
            onChange={changeInputValue}
          />
        </InputBox>
      </AccountInputBox>
      <AcountButtonBox>
        <Button onClick={() => clickLogin()}>로그인</Button>
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
