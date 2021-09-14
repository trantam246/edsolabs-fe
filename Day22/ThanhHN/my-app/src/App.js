import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  return (
    <Router>

      <Switch>
        <Redirect from='/' to='/login' exact/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
