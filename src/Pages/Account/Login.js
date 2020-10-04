import React from 'react';
import styled from 'styled-components';
import {
  AccountInputBox,
  AccountInputBoxTitle,
  InputBox,
  InputTitle,
  Input,
  AcountButtonBox,
  Button,
} from 'Styles/Widgets/AccountBox';

const Login = () => {
  return (
    <LoginBox>
      <AccountInputBox>
        <AccountInputBoxTitle>로그인</AccountInputBoxTitle>
        <InputBox>
          <InputTitle>이메일</InputTitle>
          <Input type='text' placeholder='이메일' />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호</InputTitle>
          <Input type='text' placeholder='비밀번호' />
        </InputBox>
      </AccountInputBox>
      <AcountButtonBox>
        <Button>로그인 하기</Button>
      </AcountButtonBox>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.main`
  padding: 20px 5px;
`;

// const AccountInputBox = styled.section`
//   margin: 0 auto;
//   width: 420px;

//   @media ${(props) => props.theme.mobile} {
//     width: 100%;
//   }
// `;

// const AccountInputBoxTitle = styled.h1`
//   padding: 20px 0;
//   font-size: 20px;
//   font-weight: bold;
//   text-align: center;
//   letter-spacing: 1px;
// `;

// const InputBox = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px 0;
//   width: 100%;
// `;

// const InputTitle = styled.div`
//   padding-right: 10px;
//   width: 20%;
// `;

// const Input = styled.input`
//   padding: 10px;
//   width: 80%;
//   font-size: 15px;
// `;

// const AcountButtonBox = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-top: 20px;
// `;

// const Button = styled.button`
//   width: 200px;
//   height: 50px;
//   background: pink;
//   border-radius: 5px;
//   font-size: 15px;
//   letter-spacing: 0.5px;

//   @media ${(props) => props.theme.mobile} {
//     width: 60%;
//   }
// `;
