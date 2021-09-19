import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Components/login/LoginPage';
import NavBar from './Components/navbar/Navbar';
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route
          path="/info"
          render={() => {
            return localStorage.getItem('accessToken') ? (
              <NavBar />
            ) : (
              <Redirect to="/" />
            );
          }}
        ></Route>
        <Route
          path="/timer"
          render={() => {
            return localStorage.getItem('accessToken') ? (
              <NavBar />
            ) : (
              <Redirect to="/" />
            );
          }}
        ></Route>
        <Route
          path="/report"
          render={() => {
            return localStorage.getItem('accessToken') ? (
              <NavBar />
            ) : (
              <Redirect to="/" />
            );
          }}
        ></Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
function NotFound() {
  return (
    <div>
      <h1 style={{ fontSize: '56px' }}>404 Not Found PATH </h1>
      <h1 style={{ fontSize: '30px' }}>"Please contact 03666*****!!"</h1>
    </div>
  );
}
