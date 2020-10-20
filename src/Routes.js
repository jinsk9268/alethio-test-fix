import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ContextProvider from 'Context/Context';
import Header from 'Components/Header';
import MainService from 'Pages/MainService/MainService';
import SignUp from 'Pages/Account/SignUp';
import Login from 'Pages/Account/Login';
import MyPage from 'Pages/Mypage/MyPage';
import MyPageDetail from 'Pages/Mypage/MyPageDetail';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/theme';
import GlobalStyle from 'Styles/GlobalStyle';

const Routes = () => {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/' component={MainService} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={MainService} />
          <Route exact path='/mypage/order' component={MyPage} />
          <Route exact path='/mypage/order/:id' component={MyPageDetail} />
          <Redirect from='*' to='/' />
        </Switch>
      </ThemeProvider>
    </ContextProvider>
  );
};

export default Routes;
