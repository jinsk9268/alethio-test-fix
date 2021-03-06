import React, { useState, useEffect, useMemo, useContext, memo } from 'react';
import axios from 'axios';
import { ContextDispatch } from 'Context/Context';
import Loading from './Components/Loding';
import OrderItem from './Components/OrderItem';
import { API, HEADERS, URI } from 'config';
import styled from 'styled-components';

const getPageNumbers = (pageLength) => {
  let pageNumberArr = [];
  for (let num = 1; num <= pageLength; num++) {
    pageNumberArr.push(num);
  }

  return pageNumberArr;
};

const MyPage = () => {
  // context
  const [state, dispatch] = useContext(ContextDispatch);

  // data fetching
  const [orderData, setOrderData] = useState({});
  const [pageNum, setPageNUm] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'LOADING_TRUE' });
        const orderRes = await axios.get(`${API}${URI.ORDER}?page=${pageNum}`, {
          HEADERS,
        });
        setOrderData(orderRes.data);
        dispatch({ type: 'LOADING_FALSE' });
      } catch (error) {
        alert('에러가 발생했습니다. 다시 접속해주세요');
      }
    };
    fetchData();
  }, [dispatch, pageNum]);

  // page nation
  const pageNumbers = useMemo(() => getPageNumbers(orderData.totalPages), [
    orderData.totalPages,
  ]);

  return (
    <MyPageBox>
      <MyPageTitle>마이 페이지</MyPageTitle>
      {state.loading ? (
        <Loading />
      ) : (
        <ItemList>
          {orderData.content &&
            orderData.content.map((item) => {
              return (
                <OrderItem
                  id={item.id}
                  itemName={item.itemName}
                  key={item.id}
                />
              );
            })}
        </ItemList>
      )}
      <PageNumBox>
        <ol>
          {pageNumbers.map((num) => (
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
