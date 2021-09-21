import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { saveToken } from './app/slices';
import { NavBarComponent } from './Components/NavBarComponent';
import { Login } from './Containers/Login';
import { Report } from './Containers/Report';
import { Timer } from './Containers/Timer';

function ChangePage() {
  const history = useHistory();
  const token = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/timer');
    } else {
      history.push('/');
    }
  }, [token, history]);
  return null;
}

function App() {
  const [statusLogin, setStatusLogin] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(saveToken(null));
    localStorage.removeItem('token');
  };

  const token = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (localStorage.getItem('token') && token != null) {
      setStatusLogin(true);
    } else {
      setStatusLogin(false);
    }
  }, [token]);

  return (
    <Router>
      <ChangePage />
      <Switch>
        <Route path="/" exact component={Login} />
        <React.Fragment>
          <Grid container>
            <NavBarComponent onLogout={handleLogout} />

            {statusLogin ? (
              <Route path="/timer" component={Timer} />
            ) : (
              <Redirect to="/" />
            )}
            <Route path="/report" component={Report} />
          </Grid>
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
