
import Login from './Components/Login';
import Register from './Components/Register';
import './Css/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register}></Route>
        <Route path='/register' component={Login}></Route>
      </Switch>
    </Router>

  );
}

export default App;
