import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Register from './page/Register';
import Login from './page/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </Switch>
    </Router>
  );
}

export default App;
