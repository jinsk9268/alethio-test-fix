import React from 'react';
import { Link } from 'react-router-dom';
import { ItemList, ItemBox, ItemId, ItemName } from 'Styles/Widgets/ItemBox';
import styled from 'styled-components';

const test = {
  totalPages: 3,
  currentPage: 0,
  content: [
    {
      id: 1,
      itemName: '아이템1',
    },
    {
      id: 2,
      itemName: '아이템2',
    },
    {
      id: 3,
      itemName: '아이템3',
    },
    {
      id: 4,
      itemName: '아이템4',
    },
    {
      id: 5,
      itemName: '아이템5',
    },
    {
      id: 6,
      itemName: '아이템6',
    },
    {
      id: 7,
      itemName: '아이템7',
    },
    {
      id: 8,
      itemName: '아이템8',
    },
    {
      id: 9,
      itemName: '아이템9',
    },
    {
      id: 10,
      itemName: '아이템10',
    },
  ],
};

const MyPage = () => {
  const pageNum = [];

  for (let i = 1; i <= test.totalPages; i++) {
    pageNum.push(i);
  }

  return (
    <MyPageBox>
      <MyPageTitle>마이 페이지</MyPageTitle>
      <ItemList>
        {test.content.map((item) => {
          return (
            <Link to='/mypage/order/id' key={item.id}>
              <ItemBox>
                <ItemId>{item.id}</ItemId>
                <ItemName>{item.itemName}</ItemName>
              </ItemBox>
            </Link>
          );
        })}
      </ItemList>
      <PageNumBox>
        <ol>
          {pageNum.map((num) => (
            <li key={num}>{num}</li>
          ))}
        </ol>
      </PageNumBox>
    </MyPageBox>
  );
};

export default MyPage;

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

// const ItemList = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 10px;
// `;

// const ItemBox = styled.article`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 15px 0;
//   width: 450px;
//   height: 50px;
//   border: 3px solid pink;
//   cursor: pointer;

//   @media ${(props) => props.theme.mobile} {
//     width: 100%;
//   }
// `;

// const ItemId = styled.div`
//   width: 30%;
//   border-right: 3px solid pink;
//   text-align: center;
// `;

// const ItemName = styled.div`
//   width: 70%;
//   text-align: center;
// `;

const PageNumBox = styled.div`
  margin: 0 auto;
  width: 450px;

  ol {
    display: flex;
    justify-content: center;
  }

  li {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background: pink;
    }
  }
`;
