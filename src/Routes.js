import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ContextProvider from 'Context/Context';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/theme';
import GlobalStyle from 'Styles/GlobalStyle';
import Header from 'Components/Header';
import MainService from 'Pages/MainService/MainService';
import SignUp from 'Pages/Account/SignUp';
import Login from 'Pages/Account/Login';
import MyPage from 'Pages/Mypage/MyPage';
import MyPageDetail from 'Pages/Mypage/MyPageDetail';

const Routes = () => {
  return (
    <ContextProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route exact path='/' component={MainService} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <Route exat path='/logout' component={MainService} />
            <Route exact path='/mypage/order' component={MyPage} />
            <Route exact path='/mypage/order/:id' component={MyPageDetail} />
            <Redirect from='*' to='/' />
          </Switch>
        </ThemeProvider>
      </Router>
    </ContextProvider>
  );
};

export default Routes;
