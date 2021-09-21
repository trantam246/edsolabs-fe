import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ReportPage from './pages/ReportPage/ReportPage';
import TimerPage from './pages/TimerPage/TimerPage';
import Login from './components/Login/Login'
import { useEffect, useState } from 'react';;

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      JSON.parse(localStorage.getItem('isLogged')) === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/'
          }} />
    )} />
  )

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {JSON.parse(localStorage.getItem('isLogged')) === true ? <Redirect to="/timer"/> : <Login />}
          </Route>
          <PrivateRoute path='/timer' component={TimerPage} />
          <PrivateRoute path='/report' component={ReportPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
