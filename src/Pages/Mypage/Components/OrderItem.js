import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const OrderItem = ({ id, itemName }) => {
  // 라우터 history
  const history = useHistory();

  return (
    <ItemBox onClick={() => history.push(`/mypage/order/${id}`)}>
      <ItemId>{id}</ItemId>
      <ItemName>{itemName}</ItemName>
    </ItemBox>
  );
};

export default memo(OrderItem);

const ItemBox = styled.article`
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

const ItemId = styled.div`
  width: 30%;
  border-right: 3px solid pink;
  text-align: center;
`;

const ItemName = styled.div`
  width: 70%;
  text-align: center;
`;
