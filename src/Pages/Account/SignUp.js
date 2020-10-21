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
import { ContextDispatch } from 'Context/Context';
import useInputs from './Hooks/useInputs';
import { API, HEADERS, URI } from 'config';
import styled from 'styled-components';

// 이메일 focus blur 시 처리
const useEmailFocus = (ref) => {
  const [emailState, setEmailState] = useState(false);

  useEffect(() => {
    const onFocus = () => setEmailState(true);
    const onBlur = () => setEmailState(false);
    ref.current.addEventListener('focus', onFocus);
    ref.current.addEventListener('blur', onBlur);

    // unmount시 이벤트 제거 처리
    return () => {
      ref.current.removeEventListener('focus', onFocus);
      ref.current.removeEventListener('blur', onBlur);
    };
    // email만 확인
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return emailState;
};

const SignUp = () => {
  // context
  const [state, dispatch] = useContext(ContextDispatch);

  // focus
  const emailFocus = useRef();
  const passwordFocus = useRef();
  const passwordCheckFocus = useRef();
  const mobileFocus = useRef();

  // email focus, blur
  const emailChangeBorder = useEmailFocus(emailFocus);

  // 라우터 history
  const history = useHistory();

  // 유효성
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]+)@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]+).[a-zA-Z]{2,3}$/i;
  const regPassword = /^.{8,15}$/;

  const [inputState, changeInputValue] = useInputs({
    email: '',
    password: '',
    passwordCheck: '',
    mobile: '',
  });

  const { email, password, passwordCheck, mobile } = inputState;

  const changeEmailBorder = useCallback(() => {
    const changeResult = emailChangeBorder
      ? true
      : regEmail.test(email)
      ? true
      : email.length === 0 && !emailChangeBorder
      ? true
      : false;
    return changeResult;
  }, [email, emailChangeBorder, regEmail]);

  // 회원가입
  const clickSignUp = () => {
    if (
      regEmail.test(email) &&
      regPassword.test(password) &&
      password === passwordCheck &&
      mobile
    ) {
      const isSignUp = async () => {
        try {
          const signUpRes = await axios.post(`${API}${URI.SIGNUP}`, {
            HEADERS,
            email: email,
            password: password,
            mobile: mobile,
          });
          dispatch({ type: 'SAVE_TOKEN', token: signUpRes.data.token });
          dispatch({ type: 'CHANGE_MENU', menu: '' });
          history.push('/');
        } catch (error) {
          alert('에러가 발생했습니다');
        }
      };
      isSignUp();
    }
    !regEmail.test(email)
      ? (function () {
          alert('이메일을 다시 입력하세요');
          emailFocus.current.focus();
        })()
      : !regPassword.test(password)
      ? (function () {
          alert('비밀번호를 확인해주세요');
          passwordFocus.current.focus();
        })()
      : !(password === passwordCheck)
      ? (function () {
          alert('비밀번호 일치 여부를 확인해주세요');
          passwordCheckFocus.current.focus();
        })()
      : !mobile
      ? (function () {
          alert('핸드폰을 확인해주세요');
          mobileFocus.current.focus();
        })()
      : emailFocus.current.focus();
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
            onChange={changeInputValue}
            emailBorder={changeEmailBorder()}
          />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
            ref={passwordFocus}
            onChange={changeInputValue}
            passwordBorder={password.length}
          />
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호 확인</InputTitle>
          <Input
            type='password'
            name='passwordCheck'
            placeholder='비밀번호 확인'
            ref={passwordCheckFocus}
            onChange={changeInputValue}
          />
        </InputBox>
        <InputBox>
          <InputTitle>연락처</InputTitle>
          <Input
            type='text'
            name='mobile'
            placeholder='휴대폰 번호를 입력해주세요'
            ref={mobileFocus}
            onChange={changeInputValue}
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
