import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
  memo,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TokenContext, MenuContext } from 'Context/Context';
import { API } from 'config';
import styled from 'styled-components';

// focus test
const useEmailFocus = (ref) => {
  const [emailState, setEmailState] = useState(false);

  useEffect(() => {
    const onFocus = () => setEmailState(true);
    const onBlur = () => setEmailState(false);
    ref.current.addEventListener('focus', onFocus);
    ref.current.addEventListener('blur', onBlur);
  }, [ref]);

  return emailState;
};

const SignUp = () => {
  // context
  const [token, setToken] = useContext(TokenContext);
  const [menu, setMenu] = useContext(MenuContext);
  console.log('token>>>', token);

  // 이메일 포커스
  const emailFocus = useRef();
  const emailChangeBorder = useEmailFocus(emailFocus);

  // 라우터 history
  const mainLink = useHistory();

  // 비밀번호 길이 유효성
  const regPassword = /^.{8,15}$/;

  const [signUpInputs, setSignUpInputs] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    mobile: '',
  });

  const { email, password, passwordCheck, mobile } = signUpInputs;

  const chanageSignUpInput = (e) => {
    const { name, value } = e.target;
    setSignUpInputs({ ...signUpInputs, [name]: value });
  };

  const changeEmailBorder = useCallback(() => {
    const changeResult = emailChangeBorder
      ? true
      : email.includes('@' && '.com')
      ? true
      : email.length === 0 && !emailChangeBorder
      ? true
      : false;
    return changeResult;
  }, [email, emailChangeBorder]);

  // 회원가입
  const clickSignUp = () => {
    if (
      email.includes('@' && '.com') &&
      regPassword.test(password) &&
      password === passwordCheck &&
      mobile
    ) {
      const isSignUp = async () => {
        try {
          const res = await axios.post(`${API}/sign-up`, {
            headers: { 'Content-Type': 'application/json' },
            email: email,
            password: password,
            mobile: mobile,
          });
          setToken(res.data.token);
          setMenu('');
          mainLink.push('/');
        } catch (error) {
          alert('에러가 발생했습니다', error);
        }
      };
      isSignUp();
    }
    !email.includes('@' && '.com')
      ? alert('이메일을 다시 입력하세요')
      : !regPassword.test(password)
      ? alert('비밀번호를 확인해주세요')
      : !(password === passwordCheck)
      ? alert('비밀번호 일치 여부를 확인해주세요')
      : !mobile
      ? alert('핸드폰을 확인해주세요')
      : emailFocus.current.focus();
    emailFocus.current.focus();
  };

  return (
    <SignUpBox>
      <AccountInputBox>
        <AccountInputBoxTitle>회원가입</AccountInputBoxTitle>
        <InputBox>
          <InputTitle>이메일</InputTitle>
          <InputEmail
            type='text'
            name='email'
            placeholder='이메일'
            ref={emailFocus}
            onChange={chanageSignUpInput}
            emailBorder={changeEmailBorder()}
          />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
            onChange={chanageSignUpInput}
            passwordBorder={password.length}
          />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호 확인</InputTitle>
          <Input
            type='password'
            name='passwordCheck'
            placeholder='비밀번호 확인'
            onChange={chanageSignUpInput}
          />
        </InputBox>
        <InputBox>
          <InputTitle>연락처</InputTitle>
          <Input
            type='text'
            name='mobile'
            placeholder='휴대폰 번호를 입력해주세요'
            onChange={chanageSignUpInput}
          />
        </InputBox>
      </AccountInputBox>
      <AcountButtonBox>
        <Button onClick={() => clickSignUp()}>가입하기</Button>
      </AcountButtonBox>
    </SignUpBox>
  );
};

export default memo(SignUp);

const SignUpBox = styled.main`
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
  border: ${(props) =>
    props.passwordBorder > 0 &&
    (props.passwordBorder < 8 || props.passwordBorder > 15)
      ? '2px solid red'
      : '1px solid black'};
`;

const InputEmail = styled(Input)`
  border: ${(props) =>
    props.emailBorder ? '1px solid black' : '2px solid red'};
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
