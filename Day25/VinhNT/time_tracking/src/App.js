import React from 'react';
import './App.css';
import Timer from './pages/Timer';
import Report from './pages/Report';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import useToken from './hooks/useToken';

function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  // if (token === '404') {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <Timer /> */}
          {!token ? <Redirect to="/login" /> : <Timer />}
        </Route>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
