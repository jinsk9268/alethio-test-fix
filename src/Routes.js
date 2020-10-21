import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ContextProvider from 'Context/Context';
import Header from 'Components/Header';
import MainService from 'Pages/MainService/MainService';
import SignUp from 'Pages/Account/SignUp';
import Login from 'Pages/Account/Login';
import MyPage from 'Pages/Mypage/MyPage';
import MyPageDetail from 'Pages/Mypage/MyPageDetail';
import { URL } from 'config';
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
          <Route exact path={URL.HOME} component={MainService} />
          <Route exact path={URL.SIGNUP} component={SignUp} />
          <Route exact path={URL.LOGIN} component={Login} />
          <Route exact path={URL.LOGOUT} component={MainService} />
          <Route exact path={URL.MYPAGE} component={MyPage} />
          <Route exact path={URL.MYPAGEDETAIL} component={MyPageDetail} />
          <Redirect from='*' to='/' />
        </Switch>
      </ThemeProvider>
    </ContextProvider>
  );
};

export default Routes;
