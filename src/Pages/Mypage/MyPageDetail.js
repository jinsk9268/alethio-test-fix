import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from 'config';
import styled from 'styled-components';

const MyPageDetail = () => {
  // useParams
  const id = useParams().id;

  const [orderItem, setOrderItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/order/${id}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        setOrderItem(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <DetailBox>
      <DetailTitle>주문 상세</DetailTitle>
      <ItemList>
        <ItemBox>
          <ItemId>{orderItem.id}</ItemId>
          <ItemName>{orderItem.itemName}</ItemName>
        </ItemBox>
      </ItemList>
    </DetailBox>
  );
};

export default memo(MyPageDetail);

const DetailBox = styled.main`
  padding: 20px 5px;
`;

const DetailTitle = styled.h1`
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const ItemList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const ItemBox = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  width: 450px;
  height: 50px;
  border: 3px solid pink;

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
