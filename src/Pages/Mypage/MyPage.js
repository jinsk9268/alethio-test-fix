import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import OrderItem from './Components/OrderItem';
import { API, HEADERS } from 'config';
import styled from 'styled-components';

const MyPage = () => {
  // data fetching
  const [orderData, setOrderData] = useState({});
  const [pageNum, setPageNUm] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderRes = await axios.get(`${API}/order?page=${pageNum}`, {
          HEADERS,
        });
        setOrderData(orderRes.data);
      } catch (error) {
        alert('에러가 발생했습니다. 다시 접속해주세요');
      }
    };
    fetchData();
  }, [pageNum]);

  // page nation
  const pageNumArr = [];

  for (let num = 1; num <= orderData.totalPages; num++) {
    pageNumArr.push(num);
  }

  return (
    <MyPageBox>
      <MyPageTitle>마이 페이지</MyPageTitle>
      <ItemList>
        {orderData.content &&
          orderData.content.map((item) => {
            return (
              <OrderItem id={item.id} itemName={item.itemName} key={item.id} />
            );
          })}
      </ItemList>
      <PageNumBox>
        <ol>
          {pageNumArr.map((num) => (
            <NumLi
              key={num}
              onClick={() => {
                setPageNUm(num - 1);
              }}
              changeColor={pageNum === num - 1 ? true : false}
            >
              {num}
            </NumLi>
          ))}
        </ol>
      </PageNumBox>
    </MyPageBox>
  );
};

export default memo(MyPage);

const MyPageBox = styled.main`
  padding: 20px 5px;
`;

const MyPageTitle = styled.h1`
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

const PageNumBox = styled.div`
  margin: 0 auto;
  width: 450px;

  ol {
    display: flex;
    justify-content: center;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const NumLi = styled.li`
  margin: 0 5px;
  padding: 5px 10px;
  background: ${(props) => (props.changeColor ? 'pink' : 'none')};
  cursor: pointer;

  &:hover {
    background: pink;
  }
`;
