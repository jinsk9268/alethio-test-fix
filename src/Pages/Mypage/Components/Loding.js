import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <LoadingBox>
      <i className='fas fa-spinner'></i>
      <LoadingTitle>로딩중 입니다</LoadingTitle>
    </LoadingBox>
  );
};

export default Loading;

const loadingKeyFrames = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingBox = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;

  i {
    font-size: 24px;
    animation: ${loadingKeyFrames} 1s linear infinite;
  }
`;

const LoadingTitle = styled.div`
  padding: 30px;
  font-weight: bold;
`;
