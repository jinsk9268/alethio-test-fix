import styled from 'styled-components';

export const AccountInputBox = styled.section`
  margin: 0 auto;
  width: 420px;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

export const AccountInputBoxTitle = styled.h1`
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

export const InputTitle = styled.div`
  padding-right: 10px;
  width: 20%;
`;

export const Input = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 15px;
`;

export const AcountButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const Button = styled.button`
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
