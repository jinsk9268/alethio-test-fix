import React, { useState, useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API } from 'config';
import styled from 'styled-components';

const MyPage = () => {
  // 라우터 history
  const history = useHistory();

  // data fetching
  const [orderData, setOrderData] = useState({});
  const [pageNum, setPageNUm] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderRes = await axios.get(`${API}/order?page=${pageNum}`, {
          headers: { 'Content-Type': 'application/json' },
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
              <ItemBox
                onClick={() => history.push(`/mypage/order/${item.id}`)}
                key={item.id}
              >
                <ItemId>{item.id}</ItemId>
                <ItemName>{item.itemName}</ItemName>
              </ItemBox>
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

const PageNumBox = styled.div`
  margin: 0 auto;
  width: 450px;

  ol {
    display: flex;
    justify-content: center;
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
