import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ReportPage from './pages/ReportPage/ReportPage';
import TimerPage from './pages/TimerPage/TimerPage';
import Login from './components/Login/Login'
import { useEffect, useState } from 'react';;

function App() {
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {(isLogged === true || isLogged !== null) ? <Redirect exact to="/timer" /> : <Login />}
          </Route>
          <Route exact path="/timer">
            <TimerPage />
          </Route>
          <Route exact path="/report">
            <ReportPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
