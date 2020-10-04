import styled from 'styled-components';

export const ItemList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const ItemBox = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  width: 450px;
  height: 50px;
  border: 3px solid pink;
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

export const ItemId = styled.div`
  width: 30%;
  border-right: 3px solid pink;
  text-align: center;
`;

export const ItemName = styled.div`
  width: 70%;
  text-align: center;
`;
