import React, { memo } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyle';
import Header from 'components/Header';
import MainService from 'pages/MainService/MainService';
import Login from 'pages/Account/Login';
import SignUp from 'pages/Account/SignUp';
import MyPage from 'pages/Mypage/MyPage';
import MyPageDetail from 'pages/Mypage/MyPageDetail';

const Routes = memo(() => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={MainService} />
        <Route exact path="/login" component={Login} />
        <Route exat path="/logout" component={MainService} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/mypage/order" component={MyPage} />
        <Route exact path="/mypage/order/id" component={MyPageDetail} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
});

export default Routes;
