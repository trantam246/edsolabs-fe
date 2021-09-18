import { UserContextProvider } from 'contexts/UserContext';
import { TaskContextProvider } from 'contexts/TaskContext';
import { TagContextProvider } from 'contexts/TagContext';
import Login from 'pages/login/Login';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Snackbars from 'components/snackbar/Snackbar';

function App() {
  return (
    <>
      <UserContextProvider>
        <TagContextProvider>
          <TaskContextProvider>
            <Snackbars />

            <Router>
              <Switch>
                <Route path="/login" component={Login}></Route>

                <Route
                  exact
                  path="/"
                  render={() => {
                    return localStorage.getItem('user') ? (
                      <Dashboard />
                    ) : (
                      <Redirect to="/login" component={Login} />
                    );
                  }}
                ></Route>
              </Switch>
            </Router>
          </TaskContextProvider>
        </TagContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
